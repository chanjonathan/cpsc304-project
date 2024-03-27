import { Box, Select, MenuItem, Table, SelectChangeEvent, TableBody, TableCell, TableHead, TableRow, TableContainer, Checkbox, FormControlLabel } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { tableDescriptions } from './Constants';
import { TableData, TableDescription, ColumnSelection, ColumnSelections } from './Types';
import { Get } from '../controllers/Get';

const Project = () => {
    
    const [tableName, setTableName] = useState<string>(tableDescriptions[0].name);
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

    const handleDropdownChange = async (event: SelectChangeEvent) => {
        const tableDescription = tableDescriptions.find(table => table.name === event.target.value) as TableDescription;
        setTableName(tableDescription.name);
        
        const selected = selectedColumns[tableDescription.name].filter(column => column.selected)
        const columnNames = selected.map(column => column.name)
        setTableData([])
        setTableData(await Get(tableDescription.name, columnNames))
    }

    const handleCheckBoxChange = async (event: ChangeEvent, tableName: string, columnName: string) => {
        const newSelections = {...selectedColumns};
        const newColumnSelection = newSelections[tableName].find(column => column.name === columnName) as ColumnSelection 
        const newSelected = !newColumnSelection?.selected
        newColumnSelection.selected = newSelected
        setSelectedColumns(newSelections);

        const selected = newSelections[tableName].filter(column => column.selected)
        const columnNames = selected.map(column => column.name)
        setTableData([])
        setTableData(await Get(tableName, columnNames))
    }


    return (
        <Box>
            <h1>
                Projection
            </h1>

            <Select
                onChange={handleDropdownChange}
                value={tableName}
            >
                { tableDescriptions.map(tableDescriptions => <MenuItem value={tableDescriptions.name}>{tableDescriptions.name}</MenuItem>) }
            </Select>
            
            { selectedColumns[tableName].map(column => 
                <FormControlLabel
                    label={column.name}
                    control={ <Checkbox 
                        checked={column.selected} 
                        onChange={(event) => {
                                handleCheckBoxChange(event, tableName, column.name)
                            }
                        } 
                    /> }
                />) 
            }
            
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            { selectedColumns[tableName].map(column => column.selected ? <TableCell>{column.name}</TableCell> : undefined) }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { 
                            tableData.map(data => 
                                <TableRow>
                                    { selectedColumns[tableName].map(column => (column.name in data) ? <TableCell>{data[column.name]}</TableCell> : undefined) }
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

