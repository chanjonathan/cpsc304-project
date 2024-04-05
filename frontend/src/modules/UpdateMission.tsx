import { Box, Typography } from "@mui/material"
import { tableDescriptions } from "../constants/Constants"
import { TableData, TableDescription } from "../constants/Types";
import { useEffect, useState } from "react";
import { projection } from '../api/ApiService';
import { DataTable, Mode } from "./DataTable";

const UpdateMission = ({ lastDatabaseUpdate, setLastDatabaseUpdate }: 
    { 
        lastDatabaseUpdate: number, 
        setLastDatabaseUpdate: React.Dispatch<React.SetStateAction<number>> 
    }) => {

    const [tableData, setTableData] = useState<TableData[]>([]);

    const setData = async (tableName: string, columns: string[]) => {
        try {
            const data = await projection(tableName, columns)
            setTableData(data);
        } catch (e) {
            console.error(e);
        }
    };

    const tableDescription = tableDescriptions.find(table => table.name === "Missions") as TableDescription;

    useEffect(() => {
        setData(tableDescription.name, tableDescription.primaryKeys.concat(tableDescription.attributes));
    }, [lastDatabaseUpdate, tableDescription.attributes, tableDescription.name, tableDescription.primaryKeys]);

    return (
        <Box sx={{ margin: "10px" }}>
            <Typography variant="h4">
                Update Mission
            </Typography>
            <DataTable
                columns={tableDescription.primaryKeys.concat(tableDescription.attributes)}
                keys={tableDescription.primaryKeys}
                data={tableData}
                mode={Mode.Edit}
                setLastDatabaseUpdate={setLastDatabaseUpdate}
            /> 
        </Box>
    )
}

export { UpdateMission }