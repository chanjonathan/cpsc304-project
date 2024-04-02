import { Box, Button, TextField, Typography } from "@mui/material"
import { tableDescriptions } from "../constants/Constants"
import { TableData, TableDescription } from "../constants/Types";
import { ChangeEvent, useEffect, useState } from "react";
import { deleteShip, projection } from '../api/ApiService';
import { DataTable } from "./DataTable";

const DeleteShip = ({ lastDatabaseUpdate, setLastDatabaseUpdate }: { lastDatabaseUpdate: number, setLastDatabaseUpdate: React.Dispatch<React.SetStateAction<number>> }) => {

    const [shipsData, setShipsData] = useState<TableData[]>([]);
    const [stationsData, setStationsData] = useState<TableData[]>([]);
    const [deleteKey, setDeleteKey] = useState<TableData>({});

    const handleClick = async () => {
        try {
            await deleteShip(deleteKey);
            setLastDatabaseUpdate(Date.now());
            setDeleteKey({})
        } catch (error) {
            alert(error);
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>, column: string) => {
        setDeleteKey({ ...deleteKey, [column]: event.target.value})
    }

    const setData = async (ships: string, shipsColumns: string[], stations: string, stationsColumns: string[]) => {
        try {
            const [shipsData, stationsData] = await Promise.all(
                [projection(ships, shipsColumns), projection(stations, stationsColumns)]
            );
            setShipsData(shipsData);
            setStationsData(stationsData)
        } catch (e) {
            console.error(e)
        }
    }

    const shipsDescription = tableDescriptions.find(table => table.name === "Ships") as TableDescription;
    const stationsDescription = tableDescriptions.find(table => table.name === "Stations") as TableDescription;

    useEffect(() => {
        setDeleteKey(
            shipsDescription.attributes.reduce((acc: TableData, column: string) => {
            acc[column] = ""
            return acc
        }, {})
        )
    }, [shipsDescription.attributes])   

    useEffect(() => {
        setData(shipsDescription.name, 
            shipsDescription.primaryKeys.concat(shipsDescription.attributes),
            stationsDescription.name,
            stationsDescription.primaryKeys.concat(stationsDescription.attributes),
        );
    }, [lastDatabaseUpdate, shipsDescription.attributes, shipsDescription.name, shipsDescription.primaryKeys])

    return (
        <Box sx={{ margin: "10px" }}>
            <Typography variant="h4">
                Delete Ship
            </Typography>
            <DataTable
                columns={shipsDescription.primaryKeys.concat(shipsDescription.attributes)}
                keys={shipsDescription.primaryKeys}
                data={shipsData}
            /> 
            <DataTable
                columns={stationsDescription.primaryKeys.concat(stationsDescription.attributes)}
                keys={stationsDescription.primaryKeys}
                data={stationsData}
            /> 
            <Box
                sx={{ margin: "10px" }}
            >
                { 
                    shipsDescription.primaryKeys.map((key) => 
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

export { DeleteShip }