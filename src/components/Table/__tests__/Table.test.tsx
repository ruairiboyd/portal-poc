import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Table from '../Table'

interface User {
    id: number
    name: string
    email: string
}

const users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 4, name: 'Bob Brown', email: 'bob@example.com' },
]

const columns: { header: string; accessor: keyof User; sortable?: boolean }[] =
    [
        { header: 'ID', accessor: 'id', sortable: true },
        { header: 'Name', accessor: 'name', sortable: true },
        { header: 'Email', accessor: 'email', sortable: false },
    ]

describe('Table Component', () => {
    it('renders the table correctly', () => {
        render(<Table<User> data={users} columns={columns} />)

        expect(screen.getByText('ID')).toBeInTheDocument()
        expect(screen.getByText('Name')).toBeInTheDocument()
        expect(screen.getByText('Email')).toBeInTheDocument()

        expect(screen.getByText('John Doe')).toBeInTheDocument()
        expect(screen.getByText('john@example.com')).toBeInTheDocument()
        expect(screen.getByText('Jane Smith')).toBeInTheDocument()
        expect(screen.getByText('jane@example.com')).toBeInTheDocument()
        expect(screen.getByText('Alice Johnson')).toBeInTheDocument()
        expect(screen.getByText('alice@example.com')).toBeInTheDocument()
        expect(screen.getByText('Bob Brown')).toBeInTheDocument()
        expect(screen.getByText('bob@example.com')).toBeInTheDocument()
    })

    it('sorts the table correctly when a sortable column header is clicked', () => {
        render(<Table<User> data={users} columns={columns} />)

        const nameHeader = screen.getByText('Name')

        // Initial order
        let rows = screen.getAllByRole('row')
        expect(rows[1]).toHaveTextContent('John Doe')
        expect(rows[2]).toHaveTextContent('Jane Smith')
        expect(rows[3]).toHaveTextContent('Alice Johnson')
        expect(rows[4]).toHaveTextContent('Bob Brown')

        // Click to sort by name ascending
        fireEvent.click(nameHeader)
        rows = screen.getAllByRole('row')
        expect(rows[1]).toHaveTextContent('Alice Johnson')
        expect(rows[2]).toHaveTextContent('Bob Brown')
        expect(rows[3]).toHaveTextContent('Jane Smith')
        expect(rows[4]).toHaveTextContent('John Doe')

        // Click to sort by name descending
        fireEvent.click(nameHeader)
        rows = screen.getAllByRole('row')
        expect(rows[1]).toHaveTextContent('John Doe')
        expect(rows[2]).toHaveTextContent('Jane Smith')
        expect(rows[3]).toHaveTextContent('Bob Brown')
        expect(rows[4]).toHaveTextContent('Alice Johnson')

        // Click again to sort by name ascending
        fireEvent.click(nameHeader)
        rows = screen.getAllByRole('row')
        expect(rows[1]).toHaveTextContent('Alice Johnson')
        expect(rows[2]).toHaveTextContent('Bob Brown')
        expect(rows[3]).toHaveTextContent('Jane Smith')
        expect(rows[4]).toHaveTextContent('John Doe')
    })

    it('sorts the table correctly with equal values', () => {
        const dataWithDuplicates: User[] = [
            { id: 1, name: 'John Doe', email: 'john@example.com' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
            { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
            { id: 4, name: 'Alice Johnson', email: 'alice@example.com' }, // Duplicate name
        ]

        render(<Table<User> data={dataWithDuplicates} columns={columns} />)

        const nameHeader = screen.getByText('Name')

        // Initial order
        let rows = screen.getAllByRole('row')
        expect(rows[1]).toHaveTextContent('John Doe')
        expect(rows[2]).toHaveTextContent('Jane Smith')
        expect(rows[3]).toHaveTextContent('Alice Johnson')
        expect(rows[4]).toHaveTextContent('Alice Johnson')

        // Click to sort by name ascending
        fireEvent.click(nameHeader)
        rows = screen.getAllByRole('row')
        expect(rows[1]).toHaveTextContent('Alice Johnson')
        expect(rows[2]).toHaveTextContent('Alice Johnson')
        expect(rows[3]).toHaveTextContent('Jane Smith')
        expect(rows[4]).toHaveTextContent('John Doe')

        // Click to sort by name descending
        fireEvent.click(nameHeader)
        rows = screen.getAllByRole('row')
        expect(rows[1]).toHaveTextContent('John Doe')
        expect(rows[2]).toHaveTextContent('Jane Smith')
        expect(rows[3]).toHaveTextContent('Alice Johnson')
        expect(rows[4]).toHaveTextContent('Alice Johnson')
    })

    it('applies the correct cursor style for sortable and non-sortable columns', () => {
        render(<Table<User> data={users} columns={columns} />)

        const idHeader = screen.getByText('ID')
        const nameHeader = screen.getByText('Name')
        const emailHeader = screen.getByText('Email')

        // Check cursor style using the getComputedStyle method
        expect(window.getComputedStyle(idHeader).cursor).toBe('pointer')
        expect(window.getComputedStyle(nameHeader).cursor).toBe('pointer')
        expect(window.getComputedStyle(emailHeader).cursor).toBe('default')
    })

    it('filters the table based on search term', () => {
        render(
            <Table<User>
                data={users}
                columns={columns}
                searchableColumn="name"
                searchTerm="Alice"
            />
        )

        expect(screen.getByText('Alice Johnson')).toBeInTheDocument()
        expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
        expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument()
        expect(screen.queryByText('Bob Brown')).not.toBeInTheDocument()
    })
})
