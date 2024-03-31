import { TableData } from "../constants/Types"

const HOST = "http://localhost:8000"

const projection = async (tableName: string, columns: string[]): Promise<TableData[]>  => {
    const params = columns.reduce((acc: string[], column) => {
        acc.push("attrs=" + column)
        return acc
    }, [])
	const response = await fetch(`${HOST}/${tableName}?${params.join("&")}`);
    const { result, error } = await response.json();

    if (response.status === 400) {
        throw new Error(error)
    }
	return result;
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