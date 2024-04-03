import { Box, Typography } from "@mui/material"
import { tableDescriptions } from "../constants/Constants"
import { TableData, TableDescription } from "../constants/Types";
import { useEffect, useState } from "react";
import { projection } from '../api/ApiService';
import { DataTable, Mode } from "./DataTable";

const DeleteShip = ({ lastDatabaseUpdate, setLastDatabaseUpdate }: { lastDatabaseUpdate: number, setLastDatabaseUpdate: React.Dispatch<React.SetStateAction<number>> }) => {

    const [shipsData, setShipsData] = useState<TableData[]>([]);
    const [stationsData, setStationsData] = useState<TableData[]>([]);

    const setData = async (ships: string, shipsColumns: string[], stations: string, stationsColumns: string[]) => {
        try {
            const [shipsData, stationsData] = await Promise.all(
                [projection(ships, shipsColumns), projection(stations, stationsColumns)]
            );
            setShipsData(shipsData);
            setStationsData(stationsData);
        } catch (e) {
            console.error(e);
        }
    }

    const shipsDescription = tableDescriptions.find(table => table.name === "Ships") as TableDescription;
    const stationsDescription = tableDescriptions.find(table => table.name === "Stations") as TableDescription;

    useEffect(() => {
        setData(shipsDescription.name, 
            shipsDescription.primaryKeys.concat(shipsDescription.attributes),
            stationsDescription.name,
            stationsDescription.primaryKeys.concat(stationsDescription.attributes),
        );
    }, [
            lastDatabaseUpdate, 
            shipsDescription.attributes, 
            shipsDescription.name, 
            shipsDescription.primaryKeys, 
            stationsDescription.attributes, 
            stationsDescription.name, 
            stationsDescription.primaryKeys
        ]
    );

    return (
        <Box sx={{ margin: "10px" }}>
            <Typography variant="h4">
                Delete Ship
            </Typography>
            <Typography variant="h6">
                Ships
            </Typography>
            <DataTable
                key={`ships-table-${lastDatabaseUpdate}`}
                columns={shipsDescription.primaryKeys.concat(shipsDescription.attributes)}
                keys={shipsDescription.primaryKeys}
                data={shipsData}
                mode={Mode.Delete}
                setLastDatabaseUpdate={setLastDatabaseUpdate}
            /> 
            <Typography variant="h6">
                Stations
            </Typography>
            <DataTable
                key={`stations-table-${lastDatabaseUpdate}`}
                columns={stationsDescription.primaryKeys.concat(stationsDescription.attributes)}
                keys={stationsDescription.primaryKeys}
                data={stationsData}
            /> 
        </Box>
    )
}

export { DeleteShip }