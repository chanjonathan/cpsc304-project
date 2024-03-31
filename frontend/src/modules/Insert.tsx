import { Box, Button, TextField } from "@mui/material"
import { tableDescriptions } from "../constants/Constants"
import { TableData, TableDescription } from "../constants/Types";
import { insertRow } from '../api/MockApiService';
import { ChangeEvent, useEffect, useState } from "react";

const Insert = ({ tableName, setLastDatabaseUpdate }: { tableName: string, setLastDatabaseUpdate: React.Dispatch<React.SetStateAction<number>> }) => {

    const tableDescription = tableDescriptions.find(table => table.name === tableName) as TableDescription;

    const [newRow, setNewRow] = useState<TableData>(tableDescription.attributes.reduce((acc: TableData, column: string) => {
        acc[column] = ""
        return acc
    }, {}));

    useEffect(() => {
        setNewRow(
            tableDescription.attributes.reduce((acc: TableData, column: string) => {
            acc[column] = ""
            return acc
        }, {})
        )
    }, [tableDescription.attributes])

    const handleClick = async () => {
        try {
            await insertRow(newRow);
            setLastDatabaseUpdate(Date.now())
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>, column: string) => {
        setNewRow({ ...newRow, [column]: event.target.value})
    }

    return (
        <Box sx={{ margin: "10px" }}>
            <h2>
                Insert
            </h2>
            <Box
                sx={{ margin: "10px" }}
            >
                { 
                    tableDescription.primaryKeys.map((key) => 
                        <TextField
                            key={key}
                            label={key} 
                            sx={{}}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, key)}
                            value={newRow[key]}
                        />) 
                }
            </Box>
            { 
                tableDescription.attributes.map((column) => 
                    <TextField
                        key={column}
                        label={column} 
                        sx={{ display: "flex" }}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, column)}
                        value={newRow[column]}
                    />) 
            }
            <Button
                variant="contained"
                onClick={handleClick}
            >
                Insert
            </Button>
        </Box>
    )
}

export { Insert }