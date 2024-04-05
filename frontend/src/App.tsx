import './App.css';
import { Box, Button, Typography } from '@mui/material';
import { DeleteCertification } from './modules/DeleteCertification';
import { Insert } from './modules/Insert';
import { Projection } from './modules/Projection';
import { UpdateMission } from './modules/UpdateMission';
import { useState } from 'react';
import { SelectMission } from './modules/Selection';
import { PersonnelMissions } from './modules/PersonnelMissions';
import { ShipCountByClass } from './modules/ShipCountByClass';
import { PopularShipClasses } from './modules/PopularShipClasses';
import { HighEarningWorkModels } from './modules/HighEarningWorkModels';
import { PersonnelOnAllMissions } from './modules/PersonnelOnAllMissions';

enum View {
  Projection,
  Insert,
  DeleteCertification,
  UpdateMission,
  SelectMission,
  PersonnelMissions,
  CoolStats
}

const App = () => {

  const [view, setView] = useState<View>(View.Projection)
  const [lastDatabaseUpdate, setLastDatabaseUpdate] = useState<number>(Date.now())

  return (
    <div className="App">
      <Box sx={{
        position: "fixed", 
        width: "100dvw",
         height: "130px",
        top: 0, 
        backgroundColor: "white", 
        zIndex: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Typography variant="h2">
          Space Agency
        </Typography>
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
        <Button onClick={() => setView(View.Projection)}>Project Data</Button>
        <Button onClick={() => setView(View.Insert)}>Insert Row</Button>
        <Button onClick={() => setView(View.DeleteCertification)}>Delete Certification</Button>
        <Button onClick={() => setView(View.UpdateMission)}>Update Mission</Button>
        <Button onClick={() => setView(View.SelectMission)}>Select Mission</Button>
        <Button onClick={() => setView(View.PersonnelMissions)}>Personnel Mission Assignments</Button>
        <Button onClick={() => setView(View.CoolStats)}>Cool Stats</Button>
      </Box>
      <Box sx={{marginLeft: "250px", marginTop: "130px"}}>
        
        <Box sx={{...(view === View.Projection ? {} : {display: "none"})}}>
          <Projection
            lastDatabaseUpdate={lastDatabaseUpdate}
          />      
        </Box>

        <Box sx={{...(view === View.Insert ? {} : {display: "none"})}}>   
          <Insert 
            lastDatabaseUpdate={lastDatabaseUpdate}
            setLastDatabaseUpdate={setLastDatabaseUpdate}
          />
        </Box>

        <Box sx={{...(view === View.DeleteCertification ? {} : {display: "none"})}}>
          <DeleteCertification
            lastDatabaseUpdate={lastDatabaseUpdate}
            setLastDatabaseUpdate={setLastDatabaseUpdate}
          />
        </Box>

        <Box sx={{...(view === View.UpdateMission ? {} : {display: "none"})}}>
          <UpdateMission
            lastDatabaseUpdate={lastDatabaseUpdate}
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
          <ShipCountByClass
            lastDatabaseUpdate={lastDatabaseUpdate}
          />
          <PopularShipClasses
            lastDatabaseUpdate={lastDatabaseUpdate}
          />      
          <HighEarningWorkModels
            lastDatabaseUpdate={lastDatabaseUpdate}
          />     
          <PersonnelOnAllMissions
            lastDatabaseUpdate={lastDatabaseUpdate}
          />     
        </Box>

      </Box>
    </div>
  );
}

export default App;
