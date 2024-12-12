'use client'

import { useState, useEffect } from 'react'

interface CategoryFilterProps {
    onCategoryChange: (category: string) => void
}

interface Tag {
    name: string
}

interface CategoryResponse {
    tags: Tag[]
}

export default function CategoryFilter({ onCategoryChange }: CategoryFilterProps) {
    const [categories, setCategories] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch('https://world.openfoodfacts.org/categories.json')
            .then((res) => res.json())
            .then((data: CategoryResponse) => {
                const sortedCategories = data.tags
                    .map((tag) => tag.name)
                    .sort((a, b) => a.localeCompare(b))
                setCategories(sortedCategories)
                setIsLoading(false)
            })
            .catch((error) => {
                console.error('Error fetching categories:', error)
                setIsLoading(false)
            })
    }, [])

    if (isLoading) {
        return <div>Loading categories...</div>
    }

    return (
        <select
            onChange={(e) => onCategoryChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
        >
            <option value="">All Categories</option>
            {categories.map((category) => (
                <option key={category} value={category} className="text-gray-800">
                    {category}
                </option>
            ))}
        </select>
    )
}
