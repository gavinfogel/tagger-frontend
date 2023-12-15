from typing import List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import tagger

app = FastAPI()

@app.on_event("startup")
async def startup_event():
  # Any startup events for the server, e.g. Install NLTK
  pass

# TODO: Add more strict CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the request model
class NerTagRequest(BaseModel):
    tokens: List[str]

@app.post("/ner-tag")
async def ner_tag(request_data: NerTagRequest):
    try:
        tokens = request_data.tokens
        tags = tagger.ner_tagger(tokens) # Main entrypoint to the NER tagger

        return { "tags": tags, "tokens": tokens} 
    
    except Exception as e:
        # All exceptions shouldn't be 400 (bad request), but this is to 
        # demonstrate how you'd raise an HTTPException for a given error
        raise HTTPException(status_code=400, detail=str(e))
    
@app.get("/")
async def root():
    return {"message": "NER tagger is running!"}