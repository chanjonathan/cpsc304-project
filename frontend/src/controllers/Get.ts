import { TableData } from "../constants/Types"
import { MockGetData } from "../constants/MockData"

const mockGet = async (tableName: string, columns: string[]): Promise<TableData[]>  => {
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

const get = async (tableName: string, columns: string[]): Promise<TableData[]> => {
    return []
}

export { mockGet as get } 