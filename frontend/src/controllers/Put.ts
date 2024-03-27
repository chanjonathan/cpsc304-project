import { TableData } from "../constants/Types"

const mockPut = async (data: TableData) => {
    console.log('put request with' + JSON.stringify(data))
}

const put = async (data: TableData) => {
}


export {mockPut as put}