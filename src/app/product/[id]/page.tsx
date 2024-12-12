'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface ProductDetails {
    name: string
    image: string
    ingredients: string
    nutritionFacts: {
        energy: string
        fat: string
        carbs: string
        proteins: string
    }
    labels: string[]
}

export default function ProductPage({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<ProductDetails | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch(`https://world.openfoodfacts.org/api/v0/product/${params.id}.json`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 1) {
                    setProduct({
                        name: data.product.product_name,
                        image: data.product.image_url,
                        ingredients: data.product.ingredients_text,
                        nutritionFacts: {
                            energy: data.product.nutriments.energy_100g,
                            fat: data.product.nutriments.fat_100g,
                            carbs: data.product.nutriments.carbohydrates_100g,
                            proteins: data.product.nutriments.proteins_100g,
                        },
                        labels: data.product.labels_tags,
                    })
                }
                setIsLoading(false)
            })
    }, [params.id])

    if (isLoading) return <div>Loading...</div>
    if (!product) return <div>Product not found</div>

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <Image
                        src={product.image || '/placeholder.png'}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="rounded-lg"
                    />
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
                    <p className="mb-6">{product.ingredients}</p>

                    <h2 className="text-xl font-semibold mb-4">Nutrition Facts (per 100g)</h2>
                    <ul className="mb-6">
                        <li>Energy: {product.nutritionFacts.energy} kcal</li>
                        <li>Fat: {product.nutritionFacts.fat}g</li>
                        <li>Carbohydrates: {product.nutritionFacts.carbs}g</li>
                        <li>Proteins: {product.nutritionFacts.proteins}g</li>
                    </ul>

                    <h2 className="text-xl font-semibold mb-4">Labels</h2>
                    <div className="flex flex-wrap gap-2">
                        {product.labels.map((label) => (
                            <span key={label} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                {label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

