import { TableData } from "../constants/Types"

const mockPost = async (data: TableData) => {
    console.log('post request with' + JSON.stringify(data))
}

const post = async (data: TableData) => {
}

export {mockPost as post}