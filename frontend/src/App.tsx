import './App.css';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Delete } from './modules/Delete';
import { Insert } from './modules/Insert';
import { Projection } from './modules/Projection';
import { Update } from './modules/Update';
import { useState } from 'react';
import { tableDescriptions } from './constants/Constants';
import { TableDescription } from './constants/Types';

const App = () => {

  const [tableName, setTableName] = useState<string>(tableDescriptions[0].name);
  const [lastDatabasUpdate, setLastDatabaseUpdate] = useState<number>(Date.now())

  const handleDropdownChange = async (event: SelectChangeEvent): Promise<void> => {
    const tableDescription = tableDescriptions.find(table => table.name === event.target.value) as TableDescription;
    setTableName(tableDescription.name);
  }

  return (
    <div className="App">
      <h1>
        Space Agency
      </h1>
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
      <Projection
        tableName={tableName}
        lastDatabaseUpdate={lastDatabasUpdate}
      />      
      <Insert 
        tableName={tableName}
        setLastDatabaseUpdate={setLastDatabaseUpdate}
      />
      <Delete
        tableName={tableName}
        setLastDatabaseUpdate={setLastDatabaseUpdate}
      />
      <Update
        setLastDatabaseUpdate={setLastDatabaseUpdate} 
      />
    </div>
  );
}

export default App;
