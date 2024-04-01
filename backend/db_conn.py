import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, MetaData, text

load_dotenv()

user = os.getenv("ORACLE_USER")
password = os.getenv("ORACLE_PASS")
host = os.getenv("ORACLE_HOST")
port = os.getenv("ORACLE_PORT")
dbname = os.getenv("ORACLE_DBNAME")

engine = create_engine(
    f'oracle+oracledb://{user}:{password}@{host}:{port}/?service_name={dbname}',
    thick_mode=None)

metadata = MetaData()
metadata.reflect(bind=engine)

with engine.connect() as connection:
    print(connection.scalar(text("""SELECT UNIQUE CLIENT_DRIVER
                                    FROM V$SESSION_CONNECT_INFO
                                    WHERE SID = SYS_CONTEXT('USERENV', 'SID')""")))
