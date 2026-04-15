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
    q1: str = None
    q2: str = None
    q3: str = None
    q4: str = None
    q5: str = None
    q6: str = None
    q7: str = None
    q8: str = None
    q9: str = None
    q10: str = None
    q11: str = None
    q12: str = None
    q13: str = None
    q14: str = None
    q15: str = None
    q16: str = None
    q17: str = None
    q18: str = None
    q19: str = None


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