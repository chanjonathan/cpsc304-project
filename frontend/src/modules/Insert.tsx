import { Box, Button, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import { tableDescriptions } from "../constants/Constants"
import { TableData, TableDescription } from "../constants/Types";
import { insertRow, projection } from '../api/ApiService';
import { ChangeEvent, useEffect, useState } from "react";
import { DataTable } from "./DataTable";

const Insert = ({ lastDatabaseUpdate, setLastDatabaseUpdate }: { lastDatabaseUpdate: number, setLastDatabaseUpdate: React.Dispatch<React.SetStateAction<number>> }) => {

    const [tableName, setTableName] = useState<string>("Missions");
    const [activeTable, setActiveTable] = useState<string>(tableName);
    const [tableData, setTableData] = useState<TableData[]>([]);
    const [newRow, setNewRow] = useState<TableData>({});

    const tableDescription = tableDescriptions.find(table => table.name === tableName) as TableDescription;
    
    const handleDropdownChange = async (event: SelectChangeEvent): Promise<void> => {
        const tableDescription = tableDescriptions.find(table => table.name === event.target.value) as TableDescription;
        setTableName(tableDescription.name);
        setNewRow({})
    } 

    const handleClick = async () => {
        try {
            const keys = tableDescription.primaryKeys.reduce((acc: TableData, key) => {
                acc[key] = newRow[key]
                return acc
            }, {});
            const attrs = tableDescription.attributes.reduce((acc: TableData, key) => {
                acc[key] = newRow[key]
                return acc
            }, {});
            const result = await insertRow(tableName, keys, attrs);
            setLastDatabaseUpdate(Date.now());
            setNewRow({});
            alert(result);
        } catch (e) {
            alert(e);
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>, column: string) => {
        setNewRow({ ...newRow, [column]: event.target.value})
    }

    const setData = async (tableName: string, tableDescription: TableDescription) => {
        try {
            const data = await projection(tableName, tableDescription.primaryKeys.concat(tableDescription.attributes));
            setActiveTable(tableName);
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
        setData(tableName, tableDescription);
    }, [tableName, lastDatabaseUpdate, tableDescription.primaryKeys, tableDescription.attributes, tableDescription]);

    const activetableDescription = tableDescriptions.find(table => table.name === activeTable) as TableDescription;

    return (
        <Box sx={{ margin: "10px" }}>
            <Typography variant="h4">
                Insert
            </Typography>
            <Select
                onChange={handleDropdownChange}
                value={tableName}
            >
                { tableDescriptions.map(tableDescriptions => 
                    <MenuItem 
                    key={tableDescriptions.name} 
                    value={tableDescriptions.name}
                    >
                    {tableDescriptions.name}
                    </MenuItem>) 
                }
            </Select>
            <DataTable
                columns={activetableDescription.primaryKeys.concat(activetableDescription.attributes)}
                keys={activetableDescription.primaryKeys}
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
                            value={newRow[key] || ""}
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
                        value={newRow[column] || ""}
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

