import { useState, useCallback, useMemo } from 'react'

interface Column<T> {
    header: string
    accessor: keyof T
    sortable?: boolean
}

interface TableProps<T> {
    className?: string
    columns: Column<T>[]
    data: T[]
    searchableColumn?: keyof T
    searchTerm?: string
}

function Table<T>({
    className,
    columns,
    data,
    searchableColumn,
    searchTerm,
}: TableProps<T>) {
    const [sortColumn, setSortColumn] = useState<keyof T | null>(null)
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

    const handleSort = useCallback(
        (column: keyof T) => {
            if (sortColumn === column) {
                setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
            } else {
                setSortColumn(column)
                setSortDirection('asc')
            }
        },
        [sortColumn, sortDirection]
    )

    const filteredData = useMemo(() => {
        if (!searchableColumn || !searchTerm) return data
        return data.filter((item) =>
            String(item[searchableColumn])
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        )
    }, [data, searchableColumn, searchTerm])

    const sortedData = useMemo(() => {
        if (!sortColumn) return filteredData

        return [...filteredData].sort((a, b) => {
            const aValue = a[sortColumn]
            const bValue = b[sortColumn]

            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
            return 0
        })
    }, [filteredData, sortColumn, sortDirection])

    return (
        <table className={className}>
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th
                            key={String(column.accessor)}
                            onClick={() =>
                                column.sortable !== false &&
                                handleSort(column.accessor)
                            }
                            style={{
                                cursor:
                                    column.sortable !== false
                                        ? 'pointer'
                                        : 'default',
                            }}
                        >
                            {column.header}
                            {sortColumn === column.accessor && (
                                <span>
                                    {sortDirection === 'asc' ? ' 🔼' : ' 🔽'}
                                </span>
                            )}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {sortedData.map((item, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((column) => (
                            <td key={String(column.accessor)}>
                                {String(item[column.accessor])}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table
