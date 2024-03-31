import { Box, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Checkbox, FormControlLabel } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { tableDescriptions } from '../constants/Constants';
import { TableData, ColumnSelection, ColumnSelections, TableDescription } from '../constants/Types';
import { projection } from '../api/ApiService';

const Projection = ({ tableName, lastDatabaseUpdate }: { tableName: string, lastDatabaseUpdate: number }) => {
    
    const [columnSelection, setColumnSelection] = useState<ColumnSelections>(
        tableDescriptions.reduce((acc: ColumnSelections, tableDescription) => {
            acc[tableDescription.name] = tableDescription.primaryKeys.concat(tableDescription.attributes).map((column) => {
                return {
                    name: column,
                    selected: true
                }
            })
            return acc
        }, {})
    );
    
    const [tableData, setTableData] = useState<TableData[]>([]);

    const handleCheckBoxChange = async (event: ChangeEvent, tableName: string, columnName: string) => {
        const newSelections = {...columnSelection};
        const newColumnSelection = newSelections[tableName].find(column => column.name === columnName) as ColumnSelection 
        const newSelected = !newColumnSelection?.selected
        newColumnSelection.selected = newSelected

        setColumnSelection(newSelections);
    }

    useEffect(() => {
        const selected = columnSelection[tableName].filter(column => column.selected)
        const columnNames = selected.map(column => column.name)

        setTableData([])
        projection(tableName, columnNames).then(data => setTableData(data)).catch((e) => console.log(e))
    }, [columnSelection, tableName, lastDatabaseUpdate])

    const tableDescription = tableDescriptions.find(table => table.name === tableName) as TableDescription;

    return (
        <Box sx={{ margin: "10px" }}>
            <h2>
                Projection
            </h2>

            { columnSelection[tableName].map(column => 
                    <FormControlLabel
                        key={column.name}
                        label={column.name}
                        control={ <Checkbox 
                            checked={column.selected} 
                            onChange={(event) => {
                                    handleCheckBoxChange(event, tableName, column.name)
                                }
                            } 
                        /> }
                    />

                ) 
            }
            <TableContainer sx={{minheight: "100px"}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                { 
                                    columnSelection[tableName].map(column => column.selected &&
                                        <TableCell key={column.name} sx={tableDescription.primaryKeys.includes(column.name) ? { fontWeight: 900 } : {}}>
                                            {column.name}
                                        </TableCell>) 
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { 
                                tableData.map((data, i)=> 
                                        <TableRow key={i}>
                                            { 
                                                columnSelection[tableName].map(column => (column.name in data) &&
                                                <TableCell key={column.name} sx={tableDescription.primaryKeys.includes(column.name) ? { fontWeight: 900 } : {}}>
                                                    {data[column.name]}
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

export { Projection }
