import ProductCard from './ProductCard'

interface Product {
    id: string
    name: string
    image: string
    category: string
    ingredients: string
    nutritionGrade: string
}

interface ProductListProps {
    products: Product[]
}

export default function ProductList({ products }: ProductListProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                <ProductCard key={product.id} {...product} />
            ))}
        </div>
    )
}

