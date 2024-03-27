import { Box, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Checkbox, FormControlLabel } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { tableDescriptions } from '../constants/Constants';
import { TableData, ColumnSelection, ColumnSelections, TableDescription } from '../constants/Types';
import { get } from '../controllers/Get';

const Project = ({ tableName }: { tableName: string }) => {
    
    const [selectedColumns, setSelectedColumns] = useState<ColumnSelections>(
        tableDescriptions.reduce((acc: ColumnSelections, tableDescription) => {
            acc[tableDescription.name] = tableDescription.columns.map((column) => {
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
        const newSelections = {...selectedColumns};
        const newColumnSelection = newSelections[tableName].find(column => column.name === columnName) as ColumnSelection 
        const newSelected = !newColumnSelection?.selected
        newColumnSelection.selected = newSelected
        setSelectedColumns(newSelections);
    }

    useEffect(() => {
        const selected = selectedColumns[tableName].filter(column => column.selected)
        const columnNames = selected.map(column => column.name)
        setTableData([])

        get(tableName, columnNames).then(data => setTableData(data)).catch((e) => alert(e))
    }, [selectedColumns, tableName])

    const tableDescription = tableDescriptions.find(table => table.name === tableName) as TableDescription;

    return (
        <Box sx={{ margin: "10px" }}>
            <h2>
                Projection
            </h2>

            { selectedColumns[tableName].map(column => 
                tableDescription.primaryKeys.includes(column.name) ?
                    <FormControlLabel
                        label={column.name}
                        control={ <Checkbox 
                            checked={column.selected} 
                            onChange={(event) => {
                                    handleCheckBoxChange(event, tableName, column.name)
                                }
                            } 
                        /> }
                    />
                    : 
                    undefined
                ) 
            }
            { selectedColumns[tableName].map(column => 
                !tableDescription.primaryKeys.includes(column.name) ?
                    <FormControlLabel
                        label={column.name}
                        control={ <Checkbox 
                            checked={column.selected} 
                            onChange={(event) => {
                                    handleCheckBoxChange(event, tableName, column.name)
                                }
                            } 
                        /> }
                    />
                    : 
                    undefined
                ) 
            }
            
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            { 
                                selectedColumns[tableName].map(column => column.selected && tableDescription.primaryKeys.includes(column.name) ? 
                                    <TableCell sx={{ fontWeight: 900 }}>{column.name}</TableCell> : undefined) 
                            }
                            { 
                                selectedColumns[tableName].map(column => column.selected && !tableDescription.primaryKeys.includes(column.name) ? 
                                    <TableCell>{column.name}</TableCell> : undefined) 
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { 
                            tableData.map(data => 
                                <TableRow>
                                    { 
                                        selectedColumns[tableName].map(column => (column.name in data) && tableDescription.primaryKeys.includes(column.name) ?
                                        <TableCell sx={{ fontWeight: 900 }}>{data[column.name]}</TableCell> : undefined) 
                                    }
                                    {
                                        selectedColumns[tableName].map(column => (column.name in data) && !tableDescription.primaryKeys.includes(column.name) ?
                                        <TableCell>{data[column.name]}</TableCell> : undefined) 
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

export { Project }

