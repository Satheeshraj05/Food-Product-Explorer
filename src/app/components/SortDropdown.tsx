interface SortDropdownProps {
    onSortChange: (sort: string) => void
}

export default function SortDropdown({ onSortChange }: SortDropdownProps) {
    return (
        <select
            onChange={(e) => onSortChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
        >
            <option value="" className="text-gray-800">Sort by</option>
            <option value="name_asc" className="text-gray-800">Name (A-Z)</option>
            <option value="name_desc" className="text-gray-800">Name (Z-A)</option>
            <option value="grade_asc" className="text-gray-800">Nutrition Grade (Low to High)</option>
            <option value="grade_desc" className="text-gray-800">Nutrition Grade (High to Low)</option>
        </select>
    )
}

