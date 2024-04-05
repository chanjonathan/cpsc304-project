import { useEffect, useState } from "react";
import { TableData } from "../constants/Types";
import { DataTable } from "./DataTable";
import { personnelAssignedToAllMissions } from "../api/ApiService";
import { Box, Typography } from "@mui/material";

const PersonnelOnAllMissions = ({ lastDatabaseUpdate }: { lastDatabaseUpdate: number }) => {
    
    const columns: string[] = ["EmployeeID"];
    const keys: string[] = ["EmployeeID"];
    
    const [personnel, setPersonnel] = useState<TableData[]>([]);

    const setData = async () => {
        const data = await personnelAssignedToAllMissions();
        setPersonnel(data);
    }

    useEffect(() => {
        setData();
    }, [lastDatabaseUpdate, setPersonnel])

    return (
        <Box sx={{ margin: "10px" }}>
            <Typography variant="h4">
                Personnel Working On All Missions
            </Typography>
            <DataTable 
                columns={columns}
                keys={keys}
                data={personnel}
            />
        </Box>
    )
}

export { PersonnelOnAllMissions }