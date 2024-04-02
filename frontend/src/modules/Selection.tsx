import { Box, Button, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { tableDescriptions } from "../constants/Constants";
import { TableData, TableDescription } from "../constants/Types";
import { selectMission } from "../api/ApiService";
import { DataTable } from "./DataTable";

type Condition = {
    column: string
    operator: string
    value: string
    id: string
}

type Connector = {
    operator: string
    id: string
}

const operators: string[] = [
    "=",
    ">=",
    "<=",
    ">",
    "<",
    "<>"
];

const connectorOperators = ["AND", "OR"];

const SelectMission = () => {

    const [selection, setSelection] = useState<TableData[] | null>(null)
    const [conditions, setConditions] = useState<Condition[]>([]);
    const [connectors, setConnectors] = useState<Connector[]>([]);

    const handleAdd = () => {
        const id = crypto.randomUUID()
        const newCondition: Condition = {
            column: "MissionID",
            operator: "=",
            value: "",
            id: id
        };
        if (conditions.length > 0) {
            const newConnector: Connector = {
                operator: "AND",
                id: id
            }
            setConnectors([...connectors, newConnector]);
        }
        setConditions([...conditions, newCondition]);
    }

    const handleSelect = async () => {
        const userInput = conditions.reduce((acc, condition, i) => {
            if (i > 0) {
                acc += ` ${connectors[i-1].operator} `;
            }
            acc += `${condition.column}${condition.operator}${condition.value}`
            return acc;
        }, "");
        
        try {
            const selection = await selectMission(userInput || "1=1");
            setSelection(selection);
        } catch (e) {
            console.error(e)
        }
    }

   const tableDescription = tableDescriptions.find(table => table.name === "Missions") as TableDescription;

    return (
        <Box sx={{ margin: "10px" }}>
            <Typography variant="h4">
                Select Mission
            </Typography>
            <Box>
                { conditions.map((condition, i) => 
                    <Box key={`connector-${condition.id}`}>
                        { (i > 0) &&
                            <ConnectorMenu
                                key={`connector-${condition.id}`}
                                connector={connectors[i-1]}
                                connectors={connectors}
                                setConnectors={setConnectors}
                            />
                        }
                         <Selector 
                            key={`selector-${condition.id}`}
                            condition={condition}
                            conditions={conditions}
                            setConditions={setConditions}
                            connectors={connectors}
                            setConnectors={setConnectors}
                        />
                   </Box>)
                }
                <Button sx={{marginBottom: "20px"}}onClick={handleAdd} >Add Selector</Button>
            </Box>
            <Button onClick={handleSelect} variant="contained">Select</Button>
            { selection && 
                <DataTable
                    columns={tableDescription.primaryKeys.concat(tableDescription.attributes)}
                    keys={tableDescription.primaryKeys}
                    data={selection}
                />  
            }
        </Box>
    )
}

const Selector = ({ condition, conditions, setConditions, connectors, setConnectors }: 
    {
        condition: Condition, 
        conditions: Condition[], 
        setConditions: React.Dispatch<React.SetStateAction<Condition[]>>,
        connectors: Connector[],
        setConnectors: React.Dispatch<React.SetStateAction<Connector[]>>
    }) => {

    const tableDescription = tableDescriptions.find(table => table.name === "Missions") as TableDescription;
    const { column, operator, value, id } = condition;

    const handleColumnChange = (event: SelectChangeEvent<string>) => {
        const newConditions = conditions.map(condition => {
            if (condition.id === id) {
                condition.column = event.target.value;
            }
            return condition;
        });
        setConditions(newConditions);
    }

    const handleOperatorChange = (event: SelectChangeEvent<string>) => {
        const newConditions = conditions.map(condition => {
            if (condition.id === id) {
                condition.operator = event.target.value;
            }
            return condition;
        });
        setConditions(newConditions);
    }
    
    const handleValueChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newConditions = conditions.map(condition => {
            if (condition.id === id) {
                condition.value = event.target.value;
            }
            return condition;
        });
        setConditions(newConditions);
    }

    const handleDelete = () => {
        const newConditions = conditions.filter(condition => condition.id !== id);
        setConditions(newConditions);
        const newConnectors = connectors.filter(connector => connector.id !== id);
        setConnectors(newConnectors);
    }

    return (
        <Box key={id}>
            <Select 
                onChange={handleColumnChange}
                value={column}
            >
                { tableDescription.primaryKeys.concat(tableDescription.attributes).map(column => 
                    <MenuItem key={column} value={column}>
                        {column}
                    </MenuItem>)
                }
            </Select>
            <Select 
                onChange={handleOperatorChange}
                value={operator}
            >
                { operators.map(operator => 
                    <MenuItem key={operator} value={operator}>
                        {operator}
                    </MenuItem>)
                }
            </Select>
            <TextField
                onChange={handleValueChange}
                value={value}
            />
            <Button
                onClick={handleDelete}
            >
                Delete
            </Button>
        </Box>
    )
}

const ConnectorMenu = ({ connector, connectors, setConnectors }: 
    { 
        connector: Connector,
        connectors: Connector[],
        setConnectors: React.Dispatch<React.SetStateAction<Connector[]>>
    }) => {
    
    const { operator, id } = connector

    const handleChange = (event: SelectChangeEvent<string>) => {
        const newConnectors = connectors.map(connector => {
            if (connector.id === id ) {
                connector.operator = event.target.value;
            }
            return connector
        })
        setConnectors(newConnectors);
    }

    return (
        <Select onChange={handleChange} value={operator}>
            {
                connectorOperators.map(operator => 
                    <MenuItem key={operator} value={operator}>{operator}</MenuItem>
                )
            }
        </Select>
    )
}

export { SelectMission }
