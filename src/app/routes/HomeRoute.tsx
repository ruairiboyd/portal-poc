import Table from '@/components/Table/Table'
import { useState } from 'react'

export function HomeRoute(): JSX.Element {
    const [searchTerm, setSearchTerm] = useState('')
    interface User {
        id: number
        name: string
        email: string
    }

    const users: User[] = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
    ]

    const columns: {
        header: string
        accessor: keyof User
        sortable?: boolean
    }[] = [
        { header: 'ID', accessor: 'id', sortable: false },
        { header: 'Name', accessor: 'name', sortable: true },
        { header: 'Email', accessor: 'email', sortable: true },
    ]
    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to the Home page</p>
            <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <Table
                className="table"
                data={users}
                columns={columns}
                searchTerm={searchTerm}
                searchableColumn="name"
            />
        </div>
    )
}
