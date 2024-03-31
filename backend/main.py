from typing import List
from fastapi import FastAPI, Query, Response, status
from oracledb import DatabaseError
from db_conn import cursor
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

@app.get("/")
async def hello_world():
    """
    A simple root endpoint returning a hello message.
    """
    return {"message": "Hello World!"}


@app.get("/{table}")
async def projection(table, response: Response, attrs: List[str] = Query([])):
    try:
        query = f"""
            SELECT {", ".join(attrs)} 
            FROM {table}
        """
        cursor.execute(query)
        rows = cursor.fetchall()

        results = []
        for row in rows:
            result = {}
            for i, attr in enumerate(attrs):
                result[attr] = row[i]
            results.append(result)

        return {"result": results}
    except DatabaseError as error:
        response.status_code = status.HTTP_400_BAD_REQUEST;
        return {"error": str(error)}


main()