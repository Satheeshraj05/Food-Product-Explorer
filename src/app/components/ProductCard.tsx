import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
    id: string
    name: string
    image: string
    category: string
    ingredients: string
    nutritionGrade: string
}

export default function ProductCard({ id, name, image, category, ingredients, nutritionGrade }: ProductCardProps) {
    return (
        <Link href={`/product/${id}`} className="bg-gray-100 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48">
                <Image
                    src={image || '/placeholder.png'}
                    alt={name}
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">{name}</h2>
                <p className="text-gray-700 mb-2">Category: {category}</p>
                <p className="text-gray-700 mb-2">Ingredients: {ingredients}</p>
                <p className="text-gray-700">Nutrition Grade: {nutritionGrade}</p>
            </div>
        </Link>
    )
}
