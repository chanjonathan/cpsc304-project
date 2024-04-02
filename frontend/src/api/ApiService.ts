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

const insertRow = async (tableName: string, keys: TableData, attrs: TableData) => {
    const params = Object.entries(keys).map(([key, value]) => `${key}=${value}`)
	const response = await fetch(`${HOST}/${tableName}?${params.join("&")}`,
        { method: "POST", body: JSON.stringify(attrs) }
    );
    const { result, error } = await response.json();

    if (response.status === 400) {
        throw new Error(error)
    }
	return result;
}

const deleteShip = async (keys: TableData) => {
    const params = Object.entries(keys).map((key, value) => `${key}=${value}`)
	const response = await fetch(`${HOST}/Ships?${params.join("&")}`,
        { method: "DELETE" }
    );
    const { result, error } = await response.json();

    if (response.status === 400) {
        throw new Error(error)
    }
	return result;
}

const updateMission = async (keys: TableData, attrs: TableData) => {
    const params = Object.entries(keys).map((key, value) => `${key}=${value}`)
	const response = await fetch(`${HOST}/Missions?${params.join("&")}`,
        { method: "PUT", body: JSON.stringify(attrs) }
    );
    const { result, error } = await response.json();

    if (response.status === 400) {
        throw new Error(error)
    }
	return result;
}

const selectMission = async (userInput: string): Promise<TableData[]> => {
	const response = await fetch(`${HOST}/Missions/query`,
        { method: "POST", body: JSON.stringify({ query: userInput }) }
    );
    const { result, error } = await response.json();

    if (response.status === 400) {
        throw new Error(error)
    }
    	return result;
}

const personnelAssignedToMissions = async (startDate: string, endDate: string) => {
	const response = await fetch(`${HOST}/personnel-assignedto-missions`,
        { method: "POST", body: JSON.stringify({
            startDate: startDate,
            endDate: endDate,
        }) }
    );
    const { result, error } = await response.json();

    if (response.status === 400) {
        throw new Error(error)
    }
	return result;
}

const shipCountByClass = async () => {
	const response = await fetch(`${HOST}/ship-count-by-class`);
    const { result, error } = await response.json();

    if (response.status === 400) {
        throw new Error(error)
    }
	return result;
}

const shipClassHavingMoreThanOne = async () => {
	const response = await fetch(`${HOST}/ship-class-having-more-than-one`);
    const { result, error } = await response.json();

    if (response.status === 400) {
        throw new Error(error)
    }
	return result;
}

const workModelAvgSalaryMoreThanAllAvg = async () => {
	const response = await fetch(`${HOST}/work-model-averages-that-make-more-than-all-average`);
    const { result, error } = await response.json();

    if (response.status === 400) {
        throw new Error(error)
    }
	return result;
}

const personnelAssignedToAllMissions = async () => {
	const response = await fetch(`${HOST}/personnel-assigned-to-all-missions`);
    const { result, error } = await response.json();

    if (response.status === 400) {
        throw new Error(error)
    }
	return result;
}


export { projection, insertRow, deleteShip, updateMission, selectMission, personnelAssignedToMissions } 