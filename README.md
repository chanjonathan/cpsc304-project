# project_e4u2b_i6z8h_o5f8l

_Sample project was used for the db_tunnel.sh script_

## Project Description
Our project is an application designed for the Aerospace Industry. Our project aims to help manage the creation of missions to outer space and the organization of human and capital resources.

### How to run project
Install python requirements
`pip install -r requirements.txt --no-deps`

Add this to the end of your .bashrc
`PATH=$PATH:/path/to/your/.local/bin`

If running outside UBC network/remote server, then you have to create a database tunnel
`sh backend/db_tunnel.sh`

Then run using 
`uvicorn backend.main:app --reload`
