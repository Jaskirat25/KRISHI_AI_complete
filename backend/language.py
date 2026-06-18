def english_to_punjabi(text):
    try:
        from deep_translator import GoogleTranslator

        translated_to_punjabi = GoogleTranslator(source="english", target="punjabi").translate(text)
        return translated_to_punjabi
    except Exception as e:
        return f"Error translating to Punjabi: {e}"
