import { Box, Typography } from "@mui/material"
import { tableDescriptions } from "../constants/Constants"
import { TableData, TableDescription } from "../constants/Types";
import { useEffect, useState } from "react";
import { projection } from '../api/ApiService';
import { DataTable, Mode } from "./DataTable";

const DeleteCertification = ({ lastDatabaseUpdate, setLastDatabaseUpdate }: { lastDatabaseUpdate: number, setLastDatabaseUpdate: React.Dispatch<React.SetStateAction<number>> }) => {

    const [certificationsData, setCertificationsData] = useState<TableData[]>([]);
    const [obtainedData, setObtainedData] = useState<TableData[]>([]);
    const [requiresData, setRequiresData] = useState<TableData[]>([]);

    const setData = async (
        certifications: string, certificationsColumns: string[], 
        obtained: string, obtainedColumns: string[],
        requires: string, requiresColumns: string[]
    ) => {
        try {
            const [certificationsData, obtainedData, requiresData] = await Promise.all(
                [
                    projection(certifications, certificationsColumns), 
                    projection(obtained, obtainedColumns),
                    projection(requires, requiresColumns)
                ]
            );
            setCertificationsData(certificationsData);
            setObtainedData(obtainedData);
            setRequiresData(requiresData)
        } catch (e) {
            console.error(e);
        }
    }

    const certificationsDescription = tableDescriptions.find(table => table.name === "Certifications") as TableDescription;
    const obtainedDescription = tableDescriptions.find(table => table.name === "Obtained") as TableDescription;
    const requiresDescription = tableDescriptions.find(table => table.name === "Requires") as TableDescription;

    useEffect(() => {
        setData(certificationsDescription.name, 
            certificationsDescription.primaryKeys.concat(certificationsDescription.attributes),
            obtainedDescription.name,
            obtainedDescription.primaryKeys.concat(obtainedDescription.attributes),
            requiresDescription.name,
            requiresDescription.primaryKeys.concat(requiresDescription.attributes),
        );
    }, [lastDatabaseUpdate, certificationsDescription, obtainedDescription, requiresDescription]
    );

    return (
        <Box sx={{ margin: "10px" }}>
            <Typography variant="h4">
                Delete Certification
            </Typography>
            <Typography variant="h6">
                Certifications
            </Typography>
            <DataTable
                columns={certificationsDescription.primaryKeys.concat(certificationsDescription.attributes)}
                keys={certificationsDescription.primaryKeys}
                data={certificationsData}
                mode={Mode.Delete}
                setLastDatabaseUpdate={setLastDatabaseUpdate}
            /> 
            <Typography variant="h6">
                Obtained
            </Typography>
            <DataTable
                columns={obtainedDescription.primaryKeys.concat(obtainedDescription.attributes)}
                keys={obtainedDescription.primaryKeys}
                data={obtainedData}
            /> 
            <Typography variant="h6">
                Requires
            </Typography>
            <DataTable
                columns={requiresDescription.primaryKeys.concat(requiresDescription.attributes)}
                keys={requiresDescription.primaryKeys}
                data={requiresData}
            /> 
        </Box>
    )
}

export { DeleteCertification }