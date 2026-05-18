import re
from ingest import all_pages

# =========================================
# STORE CHUNKS
# =========================================

semantic_chunks = []

# =========================================
# SECTION HEADERS  →  normalised label
# Sorted longest-first so "treatment & control"
# matches before "treatment" or "control" alone
# =========================================

SECTION_MAP = {
    "treatment & control": "Treatment & Control",
    "favorable conditions": "Favorable Conditions",
    "prevention":           "Prevention",
    "symptoms":             "Symptoms",
    "spread":               "Spread",
    "impact":               "Impact",
    "cause":                "Cause",
}

CROP_PREFIXES = ("Rice", "Sugarcane", "Wheat")


# =========================================
# HELPERS
# =========================================

def is_disease_line(line: str) -> bool:
    """True only for lines like 'Rice — Blast …', not the doc title."""
    return (
        any(line.startswith(crop) for crop in CROP_PREFIXES)
        and "—" in line
    )


def extract_disease_name(line: str) -> str:
    """Return only 'Crop — Disease Name', stripping Punjabi / pathogen text."""
    # Drop everything from the first Punjabi block-char onward
    clean = line.split("■")[0].strip()
    # Drop trailing pathogen names / parenthetical Latin names
    match = re.match(
        r'^((?:Rice|Sugarcane|Wheat)\s*—\s*[A-Za-z &\-]+)',
        clean
    )
    return match.group(1).strip() if match else clean


def detect_section(line: str):
    """Return normalised section label if line starts a known section, else None."""
    ll = line.lower()
    # Sorted longest-first so compound keys win
    for key in sorted(SECTION_MAP, key=len, reverse=True):
        if ll.startswith(key):
            return SECTION_MAP[key], len(key)   # also return key length
    return None, 0


def is_mostly_punjabi(line: str) -> bool:
    """Skip lines that are ≥60 % Punjabi block characters."""
    boxes = line.count("■")
    return boxes > 0 and boxes / len(line) >= 0.6


def english_only(text: str) -> str:
    """Strip trailing Punjabi runs from content text."""
    # Remove any sequence of ■ and surrounding whitespace
    return re.sub(r'\s*■+.*', '', text).strip()


# =========================================
# MAIN LOOP  —  current_disease lives
# OUTSIDE the page loop so it persists
# =========================================

current_disease = None
current_section = None
current_content = []
current_page    = None


def save_chunk():
    if current_section and current_content:
        text = " ".join(current_content).strip()
        if text:
            semantic_chunks.append({
                "disease":     current_disease,
                "section":     current_section,
                "content":     text,
                "page_number": current_page,
            })


for page in all_pages:

    current_page = page["page_number"]
    lines = page["text"].split("\n")

    for line in lines:

        line = line.strip()
        if not line:
            continue

        # Skip Punjabi-dominant lines entirely
        if is_mostly_punjabi(line):
            continue

        # ── Disease title? ────────────────────────────────────────
        if is_disease_line(line):
            save_chunk()
            current_disease = extract_disease_name(line)
            current_section = None
            current_content = []
            continue

        # ── Section header? ───────────────────────────────────────
        section_label, key_len = detect_section(line)
        if section_label:
            save_chunk()
            current_section = section_label
            current_content = []
            # Capture any English text on the same line after the header keyword
            remainder = english_only(line[key_len:].strip())
            if remainder:
                current_content.append(remainder)
            continue

        # ── Regular content line ──────────────────────────────────
        clean = english_only(line)
        if clean:
            current_content.append(clean)


# Save whatever is left after the last page
save_chunk()