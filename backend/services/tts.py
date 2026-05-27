import edge_tts

# =====================================
# FEMALE INDIAN VOICE
# =====================================

VOICE = "hi-IN-SwaraNeural"

# =====================================
# TEXT TO SPEECH
# =====================================

async def text_to_speech(

    text,

    output_file
):

    communicate = edge_tts.Communicate(

        text=text,

        voice=VOICE
    )

    await communicate.save(
        output_file
    )