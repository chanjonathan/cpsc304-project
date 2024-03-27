import './App.css';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Delete } from './modules/Delete';
import { Insert } from './modules/Insert';
import { Project } from './modules/Project';
import { Update } from './modules/Update';
import { useState } from 'react';
import { tableDescriptions } from './constants/Constants';
import { TableDescription } from './constants/Types';

const App = () => {

  const [tableName, setTableName] = useState<string>(tableDescriptions[0].name);

  const handleDropdownChange = async (event: SelectChangeEvent) => {
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
          { tableDescriptions.map(tableDescriptions => <MenuItem value={tableDescriptions.name}>{tableDescriptions.name}</MenuItem>) }
      </Select>
      <Project 
        tableName={tableName}
      />      
      <Insert 
        tableName={tableName}
      />
      <Update 
        tableName={tableName}
      />
      <Delete
        tableName={tableName}
      />
    </div>
  );
}

export default App;
