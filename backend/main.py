from typing import List, Dict
from fastapi import FastAPI, Query, Response, status, Request
from oracledb import DatabaseError
from db_conn import engine, metadata
from sqlalchemy import text, insert
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

def main():
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    uvicorn.run(app, host="localhost", port=8000)

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

@app.post("/{table}", status_code = 400)
async def createEntry(table, request: Request, response: Response):
    attributes = dict(request.query_params)
    query = insert(metadata.tables[table.lower()]).values(**attributes)
    with engine.connect() as conn:
        conn.execute(query)
        conn.commit()
        response.status_code = status.HTTP_200_OK
        return {"result": "success"}
    return {"error": "couldnt insert data into db, check field names are all lowercase and data isn't duplicated"}

@app.get("/{table}", status_code = 400)
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

main()
