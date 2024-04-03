import { TableCell, TableRow, Box, TextField, Button } from '@mui/material';
import { TableData } from '../constants/Types';
import { ChangeEvent, useState } from 'react';
import { updateMission } from '../api/ApiService';

export const EditRow = ({ row, columns, keys, setLastDatabaseUpdate }: {
    row: TableData;
    columns: string[];
    keys: string[];
    setLastDatabaseUpdate: React.Dispatch<React.SetStateAction<number>>;
}) => {

    const [editing, setEditing] = useState(false);
    const [edit, setEdit] = useState(row);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleCancel = () => {
        setEditing(false);
        setEdit(row);
    };

    const handleFieldChange = (event: ChangeEvent<HTMLInputElement>, column: string) => {
        setEdit({ ...edit, [column.toLowerCase()]: event.target.value });
    };

    const handeSave = async () => {
        try {
            const keyValues = keys.reduce((acc: TableData, key) => {
                acc[key] = edit[key.toLowerCase()];
                return acc;
            }, {});
            const attrsValues = columns.filter(c => !keys.includes(c)).reduce((acc: TableData, key) => {
                acc[key] = edit[key.toLowerCase()];
                return acc;
            }, {});
            await updateMission(keyValues, attrsValues);
            setLastDatabaseUpdate(Date.now());
        } catch (e) {
            alert(e);
        }
    };

    return (
        <TableRow>
            {columns.map(column => (editing && !keys.includes(column)) ?
                <TableCell key={column} sx={keys.includes(column) ? { fontWeight: 900 } : {}}>
                    <TextField
                        sx={{ fontSize: "0.875rem" }}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleFieldChange(event, column)}
                        value={edit[column.toLowerCase()] || ""}
                        variant="standard" />
                </TableCell>
                :
                <TableCell key={column} sx={keys.includes(column) ? { fontWeight: 900 } : {}}>
                    {row[column.toLowerCase()]}
                </TableCell>
            )}
            <TableCell sx={{ display: "flex", justifyContent: "center", minWidth: "175px", minHeight: "42px" }}>
                {editing ?
                    <Box>
                        <Button variant="contained" onClick={handeSave}>
                            Save
                        </Button>
                        <Button onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Box>
                    :
                    <Button variant="contained" onClick={handleEdit}>
                        Edit
                    </Button>}
            </TableCell>
        </TableRow>
    );
};
