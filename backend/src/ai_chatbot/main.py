from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ollama import Client
from pydantic import BaseModel
from sqlalchemy.orm import sessionmaker

from database import engine
from models import Base, Message

SessionLocal = sessionmaker(bind=engine)

Base.metadata.create_all(engine)

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Client(host="http://ollama:11434")

MODEL = "Qwen3-14B-Q4_K_M"

messages = []


class ChatRequest(BaseModel):
    message: str


@app.get("/")
def root():
    return {"message": "Welcome to the AI Chatbot API"}


@app.post("/chat")
def chat(request: ChatRequest):

    messages.append({"role": "user", "content": request.message})

    response = client.chat(model=MODEL, messages=messages)

    answer = response.message.content

    messages.append({"role": "assistant", "content": answer})

    db = SessionLocal()

    db.add(Message(conversation_id=1, role="user", content=request.message))

    db.add(Message(conversation_id=2, role="assistant", content=answer))

    db.commit()

    return {"answer": answer}
