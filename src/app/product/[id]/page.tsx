import Image from 'next/image'
import { notFound } from 'next/navigation'

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

async function getProduct(id: string): Promise<ProductDetails | null> {
    const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${id}.json`, { next: { revalidate: 3600 } })
    if (!res.ok) return null
    const data = await res.json()

    if (data.status === 1) {
        return {
            name: data.product.product_name || 'Unknown Product',
            image: data.product.image_url || '/placeholder.png',
            ingredients: data.product.ingredients_text || 'No ingredient information available.',
            nutritionFacts: {
                energy: data.product.nutriments.energy_100g || 'N/A',
                fat: data.product.nutriments.fat_100g || 'N/A',
                carbs: data.product.nutriments.carbohydrates_100g || 'N/A',
                proteins: data.product.nutriments.proteins_100g || 'N/A',
            },
            labels: data.product.labels_tags || [],
        }
    }
    return null
}

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: PageProps) {
    const { id } = await params; // Await the Promise to get the actual value

    if (!id || typeof id !== 'string') {
        notFound()
    }

    const product = await getProduct(id)

    if (!product) {
        notFound()
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="rounded-lg object-cover"
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
                            <span>No labels available.</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

