from pypdf import PdfReader  # type: ignore

PDF_PATH = "rag/data/Crop_Disease.pdf"

reader = PdfReader(PDF_PATH)

pages = reader.pages[1:]

all_pages = []

for page_number, page in enumerate(pages):

    text = page.extract_text()

    text = text.strip()

    if not text:
        continue

    page_data = {
        "page_number": page_number + 2,
        "text": text
    }

    all_pages.append(page_data)