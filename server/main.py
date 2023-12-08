from typing import List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import nltk
from nltk import ne_chunk
from nltk import pos_tag


app = FastAPI()

@app.on_event("startup")
async def startup_event():
    nltk.download('maxent_ne_chunker')
    nltk.download('words')
    nltk.download('averaged_perceptron_tagger')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173"],  # Your frontend origin
    allow_credentials=True,
    allow_methods=["*"],                      # Allow all methods
    allow_headers=["*"],                      # Allow all headers
)

# Define the request model
class SrlTagRequest(BaseModel):
    tokens: List[str]

def ner_tagger(tokens):
    # Part-of-speech tagging
    pos_tags = pos_tag(tokens)

    # Named entity recognition (using the pre-trained NER model)
    named_entities = ne_chunk(pos_tags)

    # Extract and return the tagged words
    ne_tagged_words = []
    for chunk in named_entities:
        if hasattr(chunk, 'label'):
            ne_tag = chunk.label()
            for c in chunk:
                ne_tagged_words.append((c[0], ne_tag))
        else:
            ne_tagged_words.append((chunk[0], chunk[1]))

    return ne_tagged_words

@app.post("/srl-tag")
async def srl_tag(request_data: SrlTagRequest):
    try:
        tokens = request_data.tokens
        # Return a new list of the same length, filled with the string "O"
        return {"tags": ner_tagger(tokens)}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))