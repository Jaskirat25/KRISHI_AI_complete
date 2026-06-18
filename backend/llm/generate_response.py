from llm.groq_client import get_client # type: ignore

def generate_response(query,retrieved_chunk):

    context = "\n\n".join([
        f"""
        Disease: {chunk['disease']}
        Section: {chunk['section']} 
        Content: {chunk['content']}
        """

        for chunk in retrieved_chunk
    ])

    prompt = f"""You are KisanBot, an expert agricultural assistant.

    RULES:
    - Answer ONLY from the CONTEXT below
    - Be concise, practical, and farmer-friendly
    - If context lacks the answer → reply exactly: "I could not find reliable information."
    - Prioritize: actionable steps > explanations > background info
    - Use bullet points for multi-step answers
    - Include quantities, timings, and units where present in context
    - Tell symptoms, solution, prevention, cause, impact favourable conditions , if appilcable and possible

    CONTEXT:
    {context}

    QUESTION: {query}

    ANSWER:"""
        
    response = get_client().chat.completions.create(

    model="llama-3.1-8b-instant",

    messages=[
        {
            "role": "user",
            "content": prompt
        }
    ],

    temperature=0.1
    )
    return response.choices[0].message.content
