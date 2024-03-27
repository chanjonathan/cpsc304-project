import { Box, Button, TextField } from "@mui/material"
import { tableDescriptions } from "../constants/Constants"
import { TableData, TableDescription } from "../constants/Types";
import { ChangeEvent, useEffect, useState } from "react";
import { put } from "../controllers/Put";

const Update = ({ tableName }: { tableName: string }) => {

    const tableDescription = tableDescriptions.find(table => table.name === tableName) as TableDescription;

    const [newRow, setNewRow] = useState<TableData>(tableDescription.columns.reduce((acc: TableData, column: string) => {
        acc[column] = ""
        return acc
    }, {}));

    useEffect(() => {
        setNewRow(
            tableDescription.columns.reduce((acc: TableData, column: string) => {
            acc[column] = ""
            return acc
        }, {})
        )
    }, [tableDescription.columns])

    const handleClick = async () => {
        try {
            await put(newRow)
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
                            value={newRow[key]}
                        />
                    ) 
                }
            </Box>

            { tableDescription.columns.map((column) => 
                !tableDescription.primaryKeys.includes(column) ?
                    <TextField
                        label={column} 
                        sx={{ display: "flex"}}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, column)}
                        value={newRow[column]}
                    />
                    :
                    undefined
                ) 
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