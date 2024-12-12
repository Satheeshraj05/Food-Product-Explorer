'use client'

import { useState } from 'react'
import { useProducts } from './hooks/useProducts'
import ProductList from './components/ProductList'
import SearchBar from './components/SearchBar'
import CategoryFilter from './components/CategoryFilter'
import SortDropdown from './components/SortDropdown'
import Link from 'next/link'

export default function Home() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [isBarcode, setIsBarcode] = useState(false)
  const [category, setCategory] = useState('')
  const [sort, setSort] = useState('')

  const { products, totalProducts, isLoading, isError } = useProducts(page, search, isBarcode, category, sort)

  const handleSearch = (query: string, barcode: boolean) => {
    setSearch(query)
    setIsBarcode(barcode)
    setPage(1)
  }

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory)
    setPage(1)
  }

  const handleSortChange = (newSort: string) => {
    setSort(newSort)
    setPage(1)
  }

  const loadMore = () => {
    setPage(page + 1)
  }

  if (isError) return <div>Error loading products</div>

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <SearchBar onSearch={handleSearch} />
        <CategoryFilter onCategoryChange={handleCategoryChange} />
        <SortDropdown onSortChange={handleSortChange} />
      </div>
      {isLoading && <div>Loading...</div>}
      {products && <ProductList products={products} />}
      {products && products.length < totalProducts && !isBarcode && (
        <button
          onClick={loadMore}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Load More
        </button>
      )}
      <Link href="/product/edit" className="mt-6 inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
        Add New Product
      </Link>
    </div>
  )
}

