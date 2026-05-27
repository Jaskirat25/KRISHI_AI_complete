from deep_translator import GoogleTranslator

def translate_to_english(text):

    try :

        translated = GoogleTranslator(
            source='auto', target='en').translate(text)
        
        return translated
    
    except Exception as e:
        return f"Translation error: {str(e)}"
    

def translate_from_engish(text,target_language):

    try:
        translated = GoogleTranslator(
            source = 'en', target = target_language).translate(text)
        return translated
    
    except Exception as e:
        return f"Translation error: {str(e)}"