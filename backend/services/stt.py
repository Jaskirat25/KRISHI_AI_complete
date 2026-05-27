from transformers import pipeline

pipe = pipeline(

    task="automatic-speech-recognition",

    model="openai/whisper-tiny"
)

def speech_to_text(audio_path):

    result = pipe(audio_path)

    return {
        "text": result["text"]
    }