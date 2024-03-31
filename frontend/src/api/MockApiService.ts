import { TableData } from "../constants/Types"
import { MockGetData } from "../constants/MockData"

const projection = async (tableName: string, columns: string[]): Promise<TableData[]>  => {
    await new Promise((resolve) => {
        setTimeout(resolve, 500)
    })
    console.log("get request for " + tableName + " with colums: " + columns)
    const mockResults = MockGetData[tableName].map((data) => columns.reduce((acc: TableData, column) => {
        acc[column] = data[column] 
        return acc
    }, {}))
    console.log(mockResults)
    return mockResults
}

const insertRow = async (data: TableData) => {
    console.log('post request with' + JSON.stringify(data))
}

const deleteRow = async (data: TableData) => {
    console.log('delete request with' + JSON.stringify(data))
}

const updateMission = async (data: TableData) => {
    console.log('put request with' + JSON.stringify(data))
}


export { projection, insertRow, deleteRow, updateMission} 