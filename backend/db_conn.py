import os
from dotenv import load_dotenv
import oracledb

load_dotenv()

user = os.getenv("ORACLE_USER")
password = os.getenv("ORACLE_PASS")
host = os.getenv("ORACLE_HOST")
port = os.getenv("ORACLE_PORT")
dbname = os.getenv("ORACLE_DBNAME")

connection = oracledb.connect(
    user=user,
    password=password,
    dsn=f"{host}:{port}/{dbname}"
)

print("Successfully connected to Oracle Database")

cursor = connection.cursor()
