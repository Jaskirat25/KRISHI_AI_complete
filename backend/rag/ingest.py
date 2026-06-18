from pypdf import PdfReader  # type: ignore
import os
PDF_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data", "Crop_Disease.pdf")

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