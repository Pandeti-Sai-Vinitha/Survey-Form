from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

# import database functions
from config import init_db, insert_response, get_all_responses as db_get_all_responses

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database
init_db()



class SurveyResponse(BaseModel):
    name: str
    project_name: str
    q1_answer: str = None
    q1_score: int = None
    q2_answer: str = None
    q2_score: int = None
    q3_answer: str = None
    q3_score: int = None
    q4_answer: str = None
    q4_score: int = None
    q5_answer: str = None
    q5_score: int = None
    q6_answer: str = None
    q6_score: int = None
    q7_answer: str = None
    q7_score: int = None
    q8_answer: str = None
    q8_score: int = None
    q9_answer: str = None
    q9_score: int = None
    q10_answer: str = None
    q10_score: int = None
    q11_answer: str = None
    q11_score: int = None
    q12_answer: str = None
    q12_score: int = None
    q13_answer: str = None
    q13_score: int = None
    q14_answer: str = None
    q14_score: int = None
    q15_answer: str = None
    q15_score: int = None
    q16_answer: str = None
    q16_score: int = None
    q17_answer: str = None
    q17_score: int = None
    q18_answer: str = None
    q18_score: int = None
    q19_answer: str = None
    q19_score: int = None


@app.post("/submit", status_code=201)
def submit_response(response: SurveyResponse):
    try:
        insert_response(response)
        return {"message": "Response saved successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/responses", response_model=List[Dict[str, Any]])
def fetch_all_responses():
    try:
        return db_get_all_responses()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))