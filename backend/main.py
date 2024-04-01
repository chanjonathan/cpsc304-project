from typing import List, Dict
from fastapi import FastAPI, Query, Response, status, Request
from .db_conn import engine, metadata
from sqlalchemy import text, insert, delete, update, select
from sqlalchemy.exc import DatabaseError
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def parseRowsToJSON(rows, attrs):
    parsedRows = []
    for row in rows:
        result = {}
        for i, attr in enumerate(attrs):
            result[attr] = row[i]
        parsedRows.append(result)
    return parsedRows


@app.get("/")
async def hello_world():
    """
    A simple root endpoint returning a hello message.
    """
    return {"message": "Hello World!"}



@app.post("/{table}", status_code=400)
async def createEntry(table, request: Request, response: Response):
    attributes = dict(request.query_params)
    try:
        query = insert(metadata.tables[table.lower()]).values(**attributes)
        with engine.connect() as conn:
            conn.execute(query)
            conn.commit()
        response.status_code = status.HTTP_200_OK
        return {"result": "success"}
    except Exception as e:
        return {"error": str(e)}


@app.delete("/Ships", status_code=400)
async def deleteShip(request: Request, response: Response):
    attributes = dict(request.query_params)
    try:
        table = metadata.tables["ships"]
        query = delete(table)
        for key, value in attributes.items():
            query = query.where(table.c[key] == value)
        with engine.connect() as conn:
            conn.execute(query)
            conn.commit()
        response.status_code = status.HTTP_200_OK
        return {"result": "success"}
    except Exception as e:
        return {"error": str(e)}


@app.put("/Missions", status_code=400)
async def updateMissions(request: Request, response: Response):
    attributes = dict(request.query_params)
    try:
        table = metadata.tables["missions"]
        query = update(table)
        for key, value in attributes.items():
            query = query.where(table.c[key] == value)
        body = await request.json()
        query = query.values(**body)
        with engine.connect() as conn:
            conn.execute(query)
            conn.commit()
        response.status_code = status.HTTP_200_OK
        return {"result": "success"}
    except Exception as e:
        return {"error": str(e)}


@app.post("/Missions/missions/query", status_code=400)
async def queryMissions(request: Request, response: Response):
    try:
        table = metadata.tables["missions"]
        body = await request.json()
        query = f"""SELECT * FROM Missions WHERE {body['query']}"""
        print(query)
        with engine.connect() as conn:
            rows = conn.execute(text(query)).fetchall()
            keys = conn.execute(text(query)).keys()
        results = parseRowsToJSON(rows, keys)
        response.status_code = status.HTTP_200_OK
        return results
    except Exception as e:
        return {"error": str(e)}




@app.get("/{table}", status_code=400)
async def getTableData(table, response: Response, attrs: List[str] = Query([])):
    if (len(attrs) == 0):
        return {"error": "pass at least one attribute"}

    try:
        query = f"""
            SELECT {", ".join(attrs)} 
            FROM {table}
        """
        with engine.connect() as conn:
            rows = conn.execute(text(query)).fetchall()

        results = parseRowsToJSON(rows, attrs)
        response.status_code = status.HTTP_200_OK
        return {"result": results}
    except DatabaseError as error:
        return {"error": str(error)}

