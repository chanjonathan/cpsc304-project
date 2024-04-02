import './App.css';
import { Box, Button, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { DeleteShip } from './modules/DeleteShip';
import { Insert } from './modules/Insert';
import { Projection } from './modules/Projection';
import { UpdateMission } from './modules/UpdateMission';
import { useState } from 'react';
import { tableDescriptions } from './constants/Constants';
import { TableDescription } from './constants/Types';
import { SelectMission } from './modules/Selection';
import { PersonnelMissions } from './modules/PersonnelMissions';

enum View {
  ProjectAndInsert,
  DeleteShip,
  UpdateMission,
  SelectMission,
  PersonnelMissions,
  CoolStats
}

const App = () => {

  const [view, setView] = useState<View>(View.ProjectAndInsert)
  const [tableName, setTableName] = useState<string>(tableDescriptions[0].name);
  const [lastDatabasUpdate, setLastDatabaseUpdate] = useState<number>(Date.now())

  const handleDropdownChange = async (event: SelectChangeEvent): Promise<void> => {
    const tableDescription = tableDescriptions.find(table => table.name === event.target.value) as TableDescription;
    setTableName(tableDescription.name);
  }

  return (
    <div className="App">
      <Box sx={{position: "fixed", width: "100dvw", height: "100px", top: 0, backgroundColor: "white", zIndex: 10}}>
        <h1>
          Space Agency
        </h1>
      </Box>
      <Box sx={{
        height: "100dvh", 
        width: "250px", 
        position: "fixed", 
        float: "left", 
        paddingBottom: "100px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        top: 0,
      }}>
        <Button onClick={() => setView(View.ProjectAndInsert)}>Project & Insert</Button>
        <Button onClick={() => setView(View.DeleteShip)}>Delete Ship</Button>
        <Button onClick={() => setView(View.UpdateMission)}>Update Mission</Button>
        <Button onClick={() => setView(View.SelectMission)}>Select Mission</Button>
        <Button onClick={() => setView(View.PersonnelMissions)}>Personnel Mission Assignments</Button>
        <Button onClick={() => setView(View.CoolStats)}>Cool Stats</Button>
      </Box>
      <Box sx={{marginLeft: "250px", marginTop: "100px"}}>
        
        <Box sx={{...(view === View.ProjectAndInsert ? {} : {display: "none"})}}>
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
        </Box>

        <Box sx={{...(view === View.DeleteShip ? {} : {display: "none"})}}>
          <DeleteShip
            setLastDatabaseUpdate={setLastDatabaseUpdate}
          />
        </Box>

        <Box sx={{...(view === View.UpdateMission ? {} : {display: "none"})}}>
          <UpdateMission
            setLastDatabaseUpdate={setLastDatabaseUpdate} 
          />
        </Box>

        <Box sx={{...(view === View.SelectMission ? {} : {display: "none"})}}>
          <SelectMission/>
        </Box>

        <Box sx={{...(view === View.PersonnelMissions ? {} : {display: "none"})}}>
          <PersonnelMissions/>
        </Box>

        <Box sx={{...(view === View.CoolStats ? {} : {display: "none"})}}>
        </Box>

      </Box>
    </div>
  );
}

export default App;
