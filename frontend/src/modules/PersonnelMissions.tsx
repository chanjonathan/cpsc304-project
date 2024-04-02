import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { DatePicker, DateValidationError, LocalizationProvider, PickerChangeHandlerContext } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from "dayjs"
import { useState } from "react"
import { personnelAssignedToMissions } from "../api/ApiService"
import { TableData, TableDescription } from "../constants/Types"
import { tableDescriptions } from "../constants/Constants"

const PersonnelMissions = () => {

    const personnelDescription = tableDescriptions.find(table => table.name === "Personnel") as TableDescription;
    const assignedToDescription = tableDescriptions.find(table => table.name === "AssignedTo") as TableDescription;
    const missionsDescription = tableDescriptions.find(table => table.name === "Missions") as TableDescription;
    
    const keys = personnelDescription.primaryKeys.concat(missionsDescription.primaryKeys)
    const columns = personnelDescription.primaryKeys.concat(personnelDescription.attributes)
                    .concat(assignedToDescription.attributes)
                    .concat(missionsDescription.primaryKeys.concat(missionsDescription.attributes));

    const [selection, setSelection] = useState<TableData[] | null>(null)
    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs())
    const [endDate, setEndDate] = useState<Dayjs | null>(dayjs())

    const handleStartDateChange = (value: Dayjs | null, context: PickerChangeHandlerContext<DateValidationError>) => {
        setStartDate(value);
    }

    const handleEndDateChange = (value: Dayjs | null, context: PickerChangeHandlerContext<DateValidationError>) => {
        setEndDate(value)
    }

    const handleFindPersonnel = async () => {
        const startDateString = (startDate as Dayjs).format('DD-MMM-YY');
        const endDateString = (endDate as Dayjs).format('DD-MMM-YY');
        try {
            const selection = await personnelAssignedToMissions(startDateString, endDateString)
            setSelection(selection)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Box>
            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                <Box sx={{display: "flex", flexDirection: "column"}}>
                    Start
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                            value={startDate}
                            onChange={handleStartDateChange}
                            format="DD-MMM-YY"
                        />
                    </LocalizationProvider>
                </Box>

                <Box sx={{display: "flex", flexDirection: "column"}}>
                    End
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                            value={endDate}
                            onChange={handleEndDateChange}
                            format="DD-MMM-YY"
                        />
                    </LocalizationProvider>
                </Box>
            </Box>
            <Button onClick={handleFindPersonnel} disabled={!startDate || !endDate} variant="contained">
                Find Personnel
            </Button>
            { selection && 
                <TableContainer sx={{minheight: "100px"}}>
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
                                    selection.map((data, i)=> 
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
            }
        </Box>
    )
}

export { PersonnelMissions }