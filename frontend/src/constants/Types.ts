type TableDescription = {
    name: string,
    columns: string[],
    primaryKeys: string[]
}

type TableData = {
    [key: string]: string | number
}

type ColumnSelections = {
    [key: string] : ColumnSelection[]
}

type ColumnSelection = {
    name: string,
    selected: boolean
}

export type { TableDescription, TableData, ColumnSelection, ColumnSelections }