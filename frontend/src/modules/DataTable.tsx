import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Box } from '@mui/material';
import { TableData } from '../constants/Types';

const DataTable = ({ columns, keys, data }: { columns: string[], keys: string[], data: TableData[] }) => {
    return (
        <Box sx={{marginBottom: "40px"}}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            { 
                                columns.map(column =>
                                    <TableCell key={column} sx={keys.includes(column) ? { fontWeight: 900 } : {}}>
                                        {column}
                                    </TableCell>) 
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { 
                            data.map((data, i)=> 
                                    <TableRow key={i}>
                                        { 
                                            columns.map(column => 
                                            <TableCell key={column} sx={keys.includes(column) ? { fontWeight: 900 } : {}}>
                                                {data[column.toLowerCase()]}
                                            </TableCell>) 
                                        }
                                    </TableRow>
                                )
                        }
                    </TableBody>
                </Table>  
            </TableContainer>   
        </Box>
    )
}

export { DataTable }