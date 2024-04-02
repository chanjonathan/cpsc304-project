import { Box, Checkbox, FormControlLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { tableDescriptions } from '../constants/Constants';
import { TableData, ColumnSelection, ColumnSelections, TableDescription } from '../constants/Types';
import { projection } from '../api/ApiService';
import { DataTable } from './DataTable';

const Projection = ({ lastDatabaseUpdate }: { lastDatabaseUpdate: number }) => {
    
    const [tableName, setTableName] = useState<string>("Missions");
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
    const [activeTable, setActiveTable] = useState<string>(tableName);
    const [tableData, setTableData] = useState<TableData[]>([]);

    const handleCheckBoxChange = async (event: ChangeEvent, tableName: string, columnName: string) => {
        const newSelections = {...columnSelection};
        const newColumnSelection = newSelections[tableName].find(column => column.name === columnName) as ColumnSelection 
        const newSelected = !newColumnSelection?.selected
        newColumnSelection.selected = newSelected

        setColumnSelection(newSelections);
    }

    const handleDropdownChange = async (event: SelectChangeEvent): Promise<void> => {
        const tableDescription = tableDescriptions.find(table => table.name === event.target.value) as TableDescription;
        setTableName(tableDescription.name);
    }    

    const setData = async (tableName: string, columns: string[]) => {
        try {
            const data = await projection(tableName, columns)
            setActiveTable(tableName);
            setTableData(data);
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        const selected = columnSelection[tableName].filter(column => column.selected);
        const columnNames = selected.map(column => column.name);

        setData(tableName, columnNames);
    }, [columnSelection, tableName, lastDatabaseUpdate])

    const activetableDescription = tableDescriptions.find(table => table.name === activeTable) as TableDescription;
    
    return (
        <Box sx={{ margin: "10px" }}>
            <Box>
                <Typography variant="h4">
                    Projection
                </Typography>
                <Select
                    onChange={handleDropdownChange}
                    value={tableName}
                >
                    { tableDescriptions.map(tableDescriptions => 
                        <MenuItem 
                        key={tableDescriptions.name} 
                        value={tableDescriptions.name}
                        >
                        {tableDescriptions.name}
                        </MenuItem>) 
                    }
                </Select>
            </Box>
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
            <DataTable
                columns={columnSelection[activeTable].filter(column => column.selected).map(column => column.name)}
                keys={activetableDescription.primaryKeys}
                data={tableData}
            /> 
        </Box>
    )
}

export { Projection }

