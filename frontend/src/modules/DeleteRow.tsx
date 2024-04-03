import { TableCell, TableRow, Button } from '@mui/material';
import { TableData } from '../constants/Types';
import { deleteShip } from '../api/ApiService';

export const DeleteRow = ({ row, columns, keys, setLastDatabaseUpdate }: {
    row: TableData;
    columns: string[];
    keys: string[];
    setLastDatabaseUpdate: React.Dispatch<React.SetStateAction<number>>;
}) => {

    const handleDelete = async () => {
        try {
            const keyValues = keys.reduce((obj: TableData, key) => {
                obj[key] = row[key.toLowerCase()];
                return obj;
            }, {});
            await deleteShip(keyValues);
            setLastDatabaseUpdate(Date.now());
        } catch (error) {
            alert(error);
        }
    };

    return (
        <TableRow>
            {columns.map(column => <TableCell key={column} sx={keys.includes(column) ? { fontWeight: 900 } : {}}>
                {row[column.toLowerCase()]}
            </TableCell>)}
            <TableCell>
                <Button variant="contained" onClick={handleDelete}>
                    Delete
                </Button>
            </TableCell>
        </TableRow>
    );
};
