import React from 'react'

function Select<T>({
    label,
    items,
    value,
    labelExtractor,
    valueExtractor,
    onValueChange,
}: SelectProps<T>) {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value
        const selectedItem = items.find(
            (item) => valueExtractor(item) === selectedValue
        )
        if (selectedItem) {
            onValueChange(selectedValue, selectedItem)
        }
    }

    return (
        <div>
            <label>{label}</label>
            <select value={value} onChange={handleChange}>
                {items.map((item, index) => (
                    <option key={index} value={valueExtractor(item)}>
                        {labelExtractor(item)}
                    </option>
                ))}
            </select>
        </div>
    )
}

interface SelectProps<T> {
    label: string
    items: T[]
    value: string
    labelExtractor: (item: T) => string
    valueExtractor: (item: T) => string
    onValueChange: (value: string, selectedItem: T) => void
}

export default Select
