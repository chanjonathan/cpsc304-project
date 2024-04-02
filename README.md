# project_e4u2b_i6z8h_o5f8l

### How to run this in remote server
Install python requirements
`pip install -r requirements.txt --no-deps`

Add this to the end of your .bashrc
`PATH=$PATH:/path/to/your/.local/bin`

Then run using 
`uvicorn backend.main:app --reload`

If running locally then its the same steps, but you might need to also run the DB tunnel if you're not connected to the UBC network first
`sh backend/db_tunnel.sh`
