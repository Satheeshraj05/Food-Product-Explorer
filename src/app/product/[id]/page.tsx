'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

// Define the structure for ProductDetails
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

// Define the props type for the ProductPage
interface ProductPageProps {
    params: { id: string }
}

export default function ProductPage({ params }: ProductPageProps) {
    const [product, setProduct] = useState<ProductDetails | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(
                    `https://world.openfoodfacts.org/api/v0/product/${params.id}.json`
                )
                const data = await response.json()

                // Check if product data exists
                if (data.status === 1) {
                    setProduct({
                        name: data.product.product_name || 'No Name Available',
                        image: data.product.image_url || '/placeholder.png',
                        ingredients: data.product.ingredients_text || 'No Ingredients Available',
                        nutritionFacts: {
                            energy: data.product.nutriments?.energy_100g || 'N/A',
                            fat: data.product.nutriments?.fat_100g || 'N/A',
                            carbs: data.product.nutriments?.carbohydrates_100g || 'N/A',
                            proteins: data.product.nutriments?.proteins_100g || 'N/A',
                        },
                        labels: data.product.labels_tags || [],
                    })
                } else {
                    console.error('Product not found:', params.id)
                }
            } catch (error) {
                console.error('Error fetching product data:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchProduct()
    }, [params.id])

    // Loading state
    if (isLoading) return <div className="text-center py-6">Loading...</div>

    // If product data is not found
    if (!product) return <div className="text-center py-6">Product not found</div>

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div>
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="rounded-lg object-cover"
                        priority
                    />
                </div>

                {/* Product Details */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
                    <p className="mb-6">{product.ingredients}</p>

                    <h2 className="text-xl font-semibold mb-4">Nutrition Facts (per 100g)</h2>
                    <ul className="mb-6 list-disc pl-5">
                        <li>Energy: {product.nutritionFacts.energy} kcal</li>
                        <li>Fat: {product.nutritionFacts.fat}g</li>
                        <li>Carbohydrates: {product.nutritionFacts.carbs}g</li>
                        <li>Proteins: {product.nutritionFacts.proteins}g</li>
                    </ul>

                    <h2 className="text-xl font-semibold mb-4">Labels</h2>
                    <div className="flex flex-wrap gap-2">
                        {product.labels.length > 0 ? (
                            product.labels.map((label) => (
                                <span
                                    key={label}
                                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                >
                                    {label}
                                </span>
                            ))
                        ) : (
                            <p>No labels available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
