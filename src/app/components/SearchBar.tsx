'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon, QrCodeIcon } from '@heroicons/react/24/solid'

interface SearchBarProps {
    onSearch: (query: string, isBarcode: boolean) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [query, setQuery] = useState('')
    const [isBarcode, setIsBarcode] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSearch(query, isBarcode)
    }

    return (
        <form onSubmit={handleSubmit} className="flex items-center mb-4">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={isBarcode ? "Enter barcode..." : "Search products..."}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
            <button
                type="button"
                onClick={() => setIsBarcode(!isBarcode)}
                className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {isBarcode ? <MagnifyingGlassIcon className="h-5 w-5" /> : <QrCodeIcon className="h-5 w-5" />}
            </button>
            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Search
            </button>
        </form>
    )
}

