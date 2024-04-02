import { Box, Button, TextField, Typography } from "@mui/material"
import { tableDescriptions } from "../constants/Constants"
import { TableData, TableDescription } from "../constants/Types";
import { ChangeEvent, useEffect, useState } from "react";
import { projection, updateMission } from '../api/ApiService';
import { DataTable } from "./DataTable";

const UpdateMission = ({ lastDatabaseUpdate, setLastDatabaseUpdate }: { lastDatabaseUpdate: number, setLastDatabaseUpdate: React.Dispatch<React.SetStateAction<number>> }) => {

    const [tableData, setTableData] = useState<TableData[]>([]);
    const [newRow, setNewRow] = useState<TableData>({});

    const tableDescription = tableDescriptions.find(table => table.name === "Missions") as TableDescription;

    const handleClick = async () => {
        try {
            const keys = tableDescription.primaryKeys.reduce((acc: TableData, key) => {
                acc[key] = newRow[key]
                return acc
            }, {})
            const attrs = tableDescription.attributes.reduce((acc: TableData, key) => {
                acc[key] = newRow[key]
                return acc
            }, {})
            await updateMission(keys, attrs);
            setLastDatabaseUpdate(Date.now())
        } catch (e) {
            alert(e)
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>, column: string) => {
        setNewRow({ ...newRow, [column]: event.target.value})
    }

    const setData = async (tableName: string, columns: string[]) => {
        try {
            const data = await projection(tableName, columns)
            setTableData(data);
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        setNewRow(
            tableDescription.attributes.reduce((acc: TableData, column: string) => {
            acc[column] = ""
            return acc
        }, {})
        )
    }, [tableDescription.attributes]);

    useEffect(() => {
        setData(tableDescription.name, tableDescription.primaryKeys.concat(tableDescription.attributes));
    }, [lastDatabaseUpdate, tableDescription.attributes, tableDescription.name, tableDescription.primaryKeys])

    return (
        <Box sx={{ margin: "10px" }}>
            <Typography variant="h4">
                Update Mission
            </Typography>
            <DataTable
                columns={tableDescription.primaryKeys.concat(tableDescription.attributes)}
                keys={tableDescription.primaryKeys}
                data={tableData}
            /> 
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

export { UpdateMission }