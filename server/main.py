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
    allow_origins=["*"],  # Your frontend origin
    allow_credentials=True,
    allow_methods=["*"],                      # Allow all methods
    allow_headers=["*"],                      # Allow all headers
)

# Define the request model
class NerTagRequest(BaseModel):
    tokens: List[str]

# BIO tagging
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

@app.post("/ner-tag")
async def ner_tag(request_data: NerTagRequest):
    try:
        tokens = request_data.tokens
        tags = tokens.copy()

        random_tags = ['B-LOC', 'I-LOC', 'B-PER', 'I-PER', 'B-ORG', 'I-ORG', 'B-MISC', 'I-MISC', 'O']



        # Overwrite the tags with NER tags
        for i in range(len(tokens)):
            # Equal probability of each tag, except for "O" which has a 70% probability
            tags[i] = random_tags[i%len(random_tags)]

        return { "tags": tags, "tokens": tokens} 
    


    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@app.get("/")
async def root():
		return {"message": "NER tagger is running!"}