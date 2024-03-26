from fastapi import FastAPI
from .db_conn import cursor

app = FastAPI()

# TODO: Create cursor once and pass to rest

@app.get("/")
async def root():
    return {"message": "Hello World!"}
