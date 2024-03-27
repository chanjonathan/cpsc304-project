import { TableData } from "../constants/Types"

const mockDel = async (data: TableData) => {
    console.log('delete request with' + JSON.stringify(data))
}

const del = async (data: TableData) => {
}

export {mockDel as del}