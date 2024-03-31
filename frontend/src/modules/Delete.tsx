import { Box, Button, TextField } from "@mui/material"
import { tableDescriptions } from "../constants/Constants"
import { TableData, TableDescription } from "../constants/Types";
import { ChangeEvent, useEffect, useState } from "react";
import { deleteRow } from '../api/MockApiService';

const Delete = ({ tableName, setLastDatabaseUpdate }: { tableName: string, setLastDatabaseUpdate: React.Dispatch<React.SetStateAction<number>> }) => {

    const tableDescription = tableDescriptions.find(table => table.name === tableName) as TableDescription;

    const [deleteKey, setDeleteKey] = useState<TableData>(tableDescription.primaryKeys.reduce((acc: TableData, column: string) => {
        acc[column] = ""
        return acc
    }, {}));

    useEffect(() => {
        setDeleteKey(
            tableDescription.attributes.reduce((acc: TableData, column: string) => {
            acc[column] = ""
            return acc
        }, {})
        )
    }, [tableDescription.attributes])

    const handleClick = async () => {
        try {
            await deleteRow(deleteKey);
            setLastDatabaseUpdate(Date.now());
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>, column: string) => {
        setDeleteKey({ ...deleteKey, [column]: event.target.value})
    }
    
    return (
        <Box sx={{ margin: "10px" }}>
            <h2>
                Delete
            </h2>
            <Box
                sx={{ margin: "10px" }}
            >
                { 
                    tableDescription.primaryKeys.map((key) => 
                        <TextField
                            key={key}
                            label={key} 
                            onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, key)}
                            value={deleteKey[key] || ""}
                        />
                    ) 
                }
            </Box>
            <Button
                variant="contained"
                onClick={handleClick}
            >
                Delete
            </Button>
        </Box>    )
}

export { Delete }