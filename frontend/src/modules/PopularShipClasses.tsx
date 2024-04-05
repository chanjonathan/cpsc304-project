import { useEffect, useState } from "react";
import { TableData } from "../constants/Types";
import { DataTable } from "./DataTable";
import { shipClassHavingMoreThanOne } from "../api/ApiService";
import { Box, Typography } from "@mui/material";

const PopularShipClasses = ({ lastDatabaseUpdate }: { lastDatabaseUpdate: number }) => {
    
    const columns: string[] = ["Class", "ShipCount"];
    const keys: string[] = ["Class"];
    
    const [counts, setCounts] = useState<TableData[]>([]);

    const setData = async () => {
        const data = await shipClassHavingMoreThanOne();
        setCounts(data);
    }

    useEffect(() => {
        setData();
    }, [lastDatabaseUpdate, setCounts])

    return (
        <Box sx={{ margin: "10px" }}>
            <Typography variant="h4">
                Most Popular Ship Classes
            </Typography>
            <Typography variant="h5">
                Classes having more than 5 ships
            </Typography>
            <DataTable 
                columns={columns}
                keys={keys}
                data={counts}
            />
        </Box>
    )
}

export { PopularShipClasses }