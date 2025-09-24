from fastapi import FastAPI
from pydantic import BaseModel, ConfigDict
from typing import List
from db import get_all_spam_messages, add_spam_message
from model import detect_spam
import json

app = FastAPI()

class SpamMessageCreate(BaseModel):
    date: str
    subject: str
    text: str
    sender: str
    recipient: str

class SpamMessageResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    date: str
    subject: str
    text: str
    sender: str
    recipient: str
    reason: str

@app.get("/messages", response_model=List[SpamMessageResponse])
def get_messages():
    messages = get_all_spam_messages()
    return [SpamMessageResponse.model_validate(msg) for msg in messages]

@app.post("/message")
def check_and_create_message(data: SpamMessageCreate):
    detection_result = json.loads(detect_spam(data.text))
    
    if detection_result.get("is_spam") == 'спам':
        
        add_spam_message(
        subject=data.subject,
        text=data.text,
        sender=data.sender,
        recipient=data.recipient,
        date=data.date,
        reason=detection_result.get('reason')
        )
        
        return {
            'result': False
        }
    
    return {
        'result': True
    }