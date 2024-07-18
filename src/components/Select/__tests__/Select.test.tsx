import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Select from '../Select'

interface User {
    id: number
    name: string
}

describe('DynamicSelect Component', () => {
    const users: User[] = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
    ]

    const mockOnValueChange = vi.fn()

    it('renders the label correctly', () => {
        render(
            <Select<User>
                label="User"
                items={users}
                value=""
                labelExtractor={(user) => user.name}
                valueExtractor={(user) => user.id.toString()}
                onValueChange={mockOnValueChange}
            />
        )

        expect(screen.getByText('User')).toBeInTheDocument()
    })

    it('renders the correct options', () => {
        render(
            <Select<User>
                label="User"
                items={users}
                value=""
                labelExtractor={(user) => user.name}
                valueExtractor={(user) => user.id.toString()}
                onValueChange={mockOnValueChange}
            />
        )

        const options = screen.getAllByRole('option')
        expect(options).toHaveLength(users.length)

        options.forEach((option, index) => {
            expect(option.textContent).toBe(users[index].name)
            expect(option).toHaveValue(users[index].id.toString())
        })
    })

    it('calls onValueChange with correct values', () => {
        render(
            <Select<User>
                label="User"
                items={users}
                value=""
                labelExtractor={(user) => user.name}
                valueExtractor={(user) => user.id.toString()}
                onValueChange={mockOnValueChange}
            />
        )

        const select = screen.getByRole('combobox')
        fireEvent.change(select, { target: { value: '2' } })

        expect(mockOnValueChange).toHaveBeenCalledWith('2', users[1])
    })
})
