import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Box, Button, Paper } from '@mui/material';
import { TableData } from '../constants/Types';
import { EditRow } from './EditRow';
import { deleteShip } from '../api/MockApiService';

enum Mode {
    Read,
    Edit,
    Delete
}

const DataTable = ({ columns, keys, data, mode, setLastDatabaseUpdate }: 
    {
        columns: string[], 
        keys: string[], 
        data: TableData[], 
        mode?: Mode,
        setLastDatabaseUpdate?: React.Dispatch<React.SetStateAction<number>> 
    }) => {

    mode = mode || Mode.Read

    return (
        <Box sx={{marginBottom: "40px"}}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            { 
                                columns.map(column =>
                                    <TableCell key={column} sx={keys.includes(column) ? { fontWeight: 900 } : {}}>
                                        {column}
                                    </TableCell>) 
                            }
                            {   (mode === Mode.Edit || mode === Mode.Delete) &&
                                <TableCell></TableCell>
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { 
                            data.map((row, i) => 
                                {
                                    switch (mode) {
                                        default:
                                            return <ReadRow key={i} row={row} columns={columns} keys={keys}/>
                                        case Mode.Edit:
                                            return <EditRow 
                                                        key={i}
                                                        row={row} 
                                                        columns={columns} 
                                                        keys={keys}
                                                        setLastDatabaseUpdate={setLastDatabaseUpdate as React.Dispatch<React.SetStateAction<number>> }
                                                    />
                                        case Mode.Delete:
                                            return <DeleteRow
                                                        key={i}
                                                        row={row} 
                                                        columns={columns} 
                                                        keys={keys}
                                                        setLastDatabaseUpdate={setLastDatabaseUpdate as React.Dispatch<React.SetStateAction<number>> }
                                                    />
                                    }
                                }
                            )
                        }
                    </TableBody>
                </Table>  
            </TableContainer>   
        </Box>
    )
}


const ReadRow = ({ row, columns, keys }: 
    {
        row: TableData, 
        columns: string[], 
        keys: string[],
    }) =>
    <TableRow>
        {
            columns.map(column => 
                <TableCell key={column} sx={keys.includes(column) ? { fontWeight: 900 } : {}}>
                    {row[column.toLowerCase()]}
                </TableCell>) 
        }
    </TableRow>

const DeleteRow = ({ row, columns, keys, setLastDatabaseUpdate }: 
    {
        row: TableData, 
        columns: string[], 
        keys: string[],
        setLastDatabaseUpdate: React.Dispatch<React.SetStateAction<number>> 
    }) => {

    const handleDelete = async () => {
        try {
            const keyValues = keys.reduce((obj: TableData, key) => {
                obj[key] = row[key.toLowerCase()]
                return obj
            }, {})
            await deleteShip(keyValues);
            setLastDatabaseUpdate(Date.now());
        } catch (error) {
            alert(error);
        }
    }

    return (
            <TableRow>
                {
                    columns.map(column => 
                        <TableCell key={column} sx={keys.includes(column) ? { fontWeight: 900 } : {}}>
                            {row[column.toLowerCase()]}
                        </TableCell>) 
                }
                <TableCell>
                    <Button variant="contained" onClick={handleDelete}>
                        Delete
                    </Button>
                </TableCell>
            </TableRow>
    )
}

export { DataTable, Mode }

