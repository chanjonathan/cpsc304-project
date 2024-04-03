import { useEffect, useState } from "react";
import { TableData } from "../constants/Types";
import { DataTable } from "./DataTable";
import { workModelAvgSalaryMoreThanAllAvg } from "../api/ApiService";
import { Box, Typography } from "@mui/material";

const HighEarningWorkModels = ({ lastDatabaseUpdate }: { lastDatabaseUpdate: number }) => {
    
    const columns: string[] = ["WorkModel", "modelAvgSalary"];
    const keys: string[] = ["WorkModel"];
    
    const [workModels, setWorkModels] = useState<TableData[]>([]);

    const setData = async () => {
        const data = await workModelAvgSalaryMoreThanAllAvg();
        setWorkModels(data);
    }

    useEffect(() => {
        setData();
    }, [lastDatabaseUpdate, setWorkModels])

    return (
        <Box sx={{ margin: "10px" }}>
            <Typography variant="h4">
                High Earning Work Models
            </Typography>
            <Typography variant="h5">
                Work model salary averages that earn more than the average of ground member salaries
            </Typography>
            <DataTable 
                columns={columns}
                keys={keys}
                data={workModels}
            />
        </Box>
    )
}

export { HighEarningWorkModels }