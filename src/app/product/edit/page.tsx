'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function EditProductPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        ingredients: '',
        nutritionGrade: '',
        image: null as File | null,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, image: e.target.files![0] }))
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const formDataToSend = new FormData()
        for (const [key, value] of Object.entries(formData)) {
            if (value !== null) {
                formDataToSend.append(key, value)
            }
        }

        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                body: formDataToSend,
            })

            if (response.ok) {
                router.push('/')
            } else {
                console.error('Failed to submit product')
            }
        } catch (error) {
            console.error('Error submitting product:', error)
        }
    }

    return (
        <div className="max-w-2xl mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Add/Edit Product</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block mb-1">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div>
                    <label htmlFor="category" className="block mb-1">Category</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div>
                    <label htmlFor="ingredients" className="block mb-1">Ingredients</label>
                    <textarea
                        id="ingredients"
                        name="ingredients"
                        value={formData.ingredients}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div>
                    <label htmlFor="nutritionGrade" className="block mb-1">Nutrition Grade</label>
                    <select
                        id="nutritionGrade"
                        name="nutritionGrade"
                        value={formData.nutritionGrade}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                    >
                        <option value="">Select a grade</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="image" className="block mb-1">Product Image</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                        accept="image/*"
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Submit Product
                </button>
            </form>
        </div>
    )
}

