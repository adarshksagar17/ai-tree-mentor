import requests # This is built-in, no install needed!
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# YOUR GROQ KEY
GROQ_API_KEY = "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"

class QuestionRequest(BaseModel):
    question: str

@app.post("/ask-mentor")
async def ask_mentor(request: QuestionRequest):
    # We call the API directly using a standard web request
    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "llama-3.3-70b-versatile",
        "messages": [{"role": "user", "content": request.question}]
    }
    
    response = requests.post(url, headers=headers, json=data)
    result = response.json()
    
    # Get the text from the response
    advice = result['choices'][0]['message']['content']
    return {"advice": advice, "tree_reaction": "#228B22"}