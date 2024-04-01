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

@app.get("/ship-count-by-class", status_code=400)
async def getShipCountByClass(response: Response):
    try:
        query = """
            SELECT m.Class, COUNT(*) as shipCount
            FROM ships s, models m
            WHERE s.Model=m.Model
            GROUP BY m.Class
        """
        with engine.connect() as conn:
            rows = conn.execute(text(query)).fetchall()
            keys = conn.execute(text(query)).keys()
        results = parseRowsToJSON(rows, keys)
        response.status_code = status.HTTP_200_OK
        return results
    except Exception as e:
        return {"error": str(e)}


@app.get("/ship-class-having-more-than-one", status_code=400)
async def moreThanOneShipClass(response: Response):
    try:
        query = """
SELECT m.Class, COUNT(*) as shipCount
FROM ships s, models m
WHERE s.Model=m.Model
GROUP BY m.Class
HAVING COUNT(*)>1
        """
        with engine.connect() as conn:
            rows = conn.execute(text(query)).fetchall()
            keys = conn.execute(text(query)).keys()
        results = parseRowsToJSON(rows, keys)
        response.status_code = status.HTTP_200_OK
        return results
    except Exception as e:
        return {"error": str(e)}


@app.get("/work-model-averages-that-make-more-than-all-average", status_code=400)
async def average(response: Response):
    try:
        query = """
SELECT g.WorkModel, AVG(p,Salary) AS modelAvgSalary
FROM groundMembers g, personnel p
WHERE g.EmployeeID=p.EmployeeID
GROUP BY g.WorkModel
HAVING AVG(Salary) > ( SELECT AVG(p1.Salary)
				 FROM personnel p1 )
        """
        with engine.connect() as conn:
            rows = conn.execute(text(query)).fetchall()
            keys = conn.execute(text(query)).keys()
        results = parseRowsToJSON(rows, keys)
        response.status_code = status.HTTP_200_OK
        return results
    except Exception as e:
        return {"error": str(e)}


@app.get("/personnel-assigned-to-all-missions", status_code=400)
async def average(response: Response):
    try:
        query = """
SELECT p.EmployeeID
FROM Personnel p
WHERE NOT EXISTS (SELECT m.MissionID
   		  FROM Missions m 
  		  MINUS 
  SELECT a.MissionID
  FROM AssignedTo a
  WHERE a.EmployeeID = p.EmployeeID);
        """
        with engine.connect() as conn:
            rows = conn.execute(text(query)).fetchall()
            keys = conn.execute(text(query)).keys()
        results = parseRowsToJSON(rows, keys)
        response.status_code = status.HTTP_200_OK
        return results
    except Exception as e:
        return {"error": str(e)}


@app.post("/assignedtomissions", status_code=400)
async def assignedToMissions(request: Request, response: Response):
    try:
        body = await request.json()
        print(body)
        query = f"""
        SELECT * FROM missions m, assignedTo a, personnel p WHERE 
        m.MissionID=a.MissionID and a.EmployeeID=p.EmployeeID and \'{body["startDate"]}\'<=m.startDate and m.endDate<=\'{body["endDate"]}\'
        """
        with engine.connect() as conn:
            rows = conn.execute(text(query)).fetchall()
            keys = conn.execute(text(query)).keys()
        results = parseRowsToJSON(rows, keys)
        response.status_code = status.HTTP_200_OK
        return results
    except Exception as e:
        return {"error": str(e)}


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
        body = await request.json()
        query = f"""SELECT * FROM Missions WHERE {body['query']}"""
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

