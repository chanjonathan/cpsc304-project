import { TableData } from "../constants/Types"
import { MockGetData } from "../constants/MockData"

const projection = async (tableName: string, columns: string[]): Promise<TableData[]>  => {
    await new Promise((resolve) => {
        setTimeout(resolve, 500)
    })
    console.log("get request for", tableName, "with colums:", columns)
    const mockResults = MockGetData[tableName].map((data) => columns.reduce((acc: TableData, column) => {
        acc[column] = data[column] 
        return acc
    }, {}))
    console.log(mockResults)
    return mockResults
}

const insertRow = async (tableName: string, keys: TableData, attrs: TableData) => {
    console.log("post request with", tableName, JSON.stringify(keys), JSON.stringify(attrs))
}

const deleteShip = async (keys: TableData)  => {
    console.log("delete ship request with", JSON.stringify(keys))
}

const updateMission = async (keys: TableData, attrs: TableData) => {
    console.log("update mission request with", JSON.stringify(keys), JSON.stringify(attrs))
}


export { projection, insertRow, deleteShip, updateMission} 