import { Box, Button, TextField } from "@mui/material"
import { tableDescriptions } from "../constants/Constants"
import { TableData, TableDescription } from "../constants/Types";
import { ChangeEvent, useEffect, useState } from "react";
import { updateMission } from '../api/MockApiService';

const Update = () => {

    const tableDescription = tableDescriptions.find(table => table.name === "Missions") as TableDescription;

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
            await updateMission(newRow)
        } catch (e) {
            alert(e)
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>, column: string) => {
        setNewRow({ ...newRow, [column]: event.target.value})
    }

    return (
        <Box sx={{ margin: "10px" }}>
            <h2>
                Update Mission
            </h2>
            <Box
                sx={{ margin: "10px" }}
            >
                { 
                    tableDescription.primaryKeys.map((key) => 
                        <TextField
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
                        label={column} 
                        sx={{ display: "flex"}}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, column)}
                        value={newRow[column]}
                    />) 
            }
            <Button
                variant="contained"
                onClick={handleClick}
            >
                Update
            </Button>
        </Box>
    )
}

export { Update }