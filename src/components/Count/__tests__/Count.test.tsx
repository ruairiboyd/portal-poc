import { Count } from '../Count'
import { render, fireEvent } from '@testing-library/react'

describe('Count', () => {
    test('initially displays count of 0', () => {
        const { getByText } = render(<Count />)
        expect(getByText('Count: 0')).toBeInTheDocument()
    })
    test('clicking increment button increases count by 1', () => {
        const { getByText } = render(<Count />)
        fireEvent.click(getByText('Increment'))
        expect(getByText('Count: 1')).toBeInTheDocument()
    })
    test('clicking increment button twice increases count by 2', () => {
        const { getByText } = render(<Count />)
        fireEvent.click(getByText('Increment'))
        fireEvent.click(getByText('Increment'))
        expect(getByText('Count: 2')).toBeInTheDocument()
    })
    test('clicking increment button 3* increases count by 3', () => {
        const { getByText } = render(<Count />)
        fireEvent.click(getByText('Increment'))
        fireEvent.click(getByText('Increment'))
        fireEvent.click(getByText('Increment'))
        expect(getByText('Count: 3')).toBeInTheDocument()
    })
})
