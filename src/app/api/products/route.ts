import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

const OPENFOODFACTS_API = 'https://world.openfoodfacts.org/cgi/search.pl'

// Define interfaces for API responses
interface OpenFoodFactsProduct {
    code: string
    product_name: string
    image_url: string
    categories_tags: string[]
    ingredients_text?: string
    nutrition_grades?: string
}

interface OpenFoodFactsBarcodeResponse {
    status: number
    product: OpenFoodFactsProduct
}

interface OpenFoodFactsSearchResponse {
    count: number
    products: OpenFoodFactsProduct[]
}

export async function POST(request: Request) {
    const data = await request.formData()
    const name = data.get('name') as string
    const category = data.get('category') as string
    const ingredients = data.get('ingredients') as string
    const nutritionGrade = data.get('nutritionGrade') as string
    const image = data.get('image') as File

    if (!name || !category || !ingredients || !nutritionGrade || !image) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    try {
        const bytes = await image.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Save the file to the public directory
        const filename = Date.now() + '-' + image.name
        const filepath = path.join(process.cwd(), 'public', 'uploads', filename)
        await writeFile(filepath, buffer)

        // Return the product data
        return NextResponse.json({
            name,
            category,
            ingredients,
            nutritionGrade,
            imageUrl: `/uploads/${filename}`,
        })
    } catch (error) {
        console.error('Error saving product:', error)
        return NextResponse.json({ error: 'Failed to save product' }, { status: 500 })
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || '1'
    const search = searchParams.get('search') || ''
    const isBarcode = searchParams.get('isBarcode') === 'true'
    const category = searchParams.get('category') || ''
    const sort = searchParams.get('sort') || ''

    let apiUrl: string

    if (isBarcode) {
        apiUrl = `https://world.openfoodfacts.org/api/v0/product/${search}.json`
    } else {
        apiUrl = `${OPENFOODFACTS_API}?action=process&json=true&page=${page}&page_size=20&search_terms=${search}`

        if (category) {
            apiUrl += `&tagtype_0=categories&tag_contains_0=contains&tag_0=${category}`
        }

        if (sort) {
            const [field, order] = sort.split('_')
            apiUrl += `&sort_by=${field}&sort_order=${order === 'asc' ? 'ascending' : 'descending'}`
        }
    }

    const response = await fetch(apiUrl)
    const data: OpenFoodFactsBarcodeResponse | OpenFoodFactsSearchResponse = await response.json()

    if (isBarcode) {
        const barcodeData = data as OpenFoodFactsBarcodeResponse
        if (barcodeData.status === 1) {
            const product = barcodeData.product
            return NextResponse.json({
                products: [
                    {
                        id: product.code,
                        name: product.product_name,
                        image: product.image_url,
                        category: product.categories_tags[0],
                        ingredients: product.ingredients_text,
                        nutritionGrade: product.nutrition_grades,
                    },
                ],
                total: 1,
            })
        } else {
            return NextResponse.json({
                products: [],
                total: 0,
            })
        }
    } else {
        const searchData = data as OpenFoodFactsSearchResponse
        const products = searchData.products.map((product) => ({
            id: product.code,
            name: product.product_name,
            image: product.image_url,
            category: product.categories_tags[0],
            ingredients: product.ingredients_text,
            nutritionGrade: product.nutrition_grades,
        }))

        return NextResponse.json({
            products,
            total: searchData.count,
        })
    }
}
