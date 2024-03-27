import { Box, Button, TextField } from "@mui/material"
import { tableDescriptions } from "../constants/Constants"
import { TableData, TableDescription } from "../constants/Types";
import { ChangeEvent, useEffect, useState } from "react";
import { del } from "../controllers/Delete";

const Delete = ({ tableName }: { tableName: string }) => {

    const tableDescription = tableDescriptions.find(table => table.name === tableName) as TableDescription;

    const [deleteKey, setDeleteKey] = useState<TableData>(tableDescription.primaryKeys.reduce((acc: TableData, column: string) => {
        acc[column] = ""
        return acc
    }, {}));

    useEffect(() => {
        setDeleteKey(
            tableDescription.columns.reduce((acc: TableData, column: string) => {
            acc[column] = ""
            return acc
        }, {})
        )
    }, [tableDescription.columns])

    const handleClick = async () => {
        try {
            await del(deleteKey)
        } catch (e) {
            alert(e)
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>, column: string) => {
        setDeleteKey({ ...deleteKey, [column]: event.target.value})
    }
    
    return (
        <Box sx={{ margin: "10px" }}>
            <h2>
                Update
            </h2>
            <Box
                sx={{ margin: "10px" }}
            >
                { tableDescription.primaryKeys.map((key) => 
                        <TextField
                            label={key} 
                            sx={{}}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, key)}
                            value={deleteKey[key]}
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