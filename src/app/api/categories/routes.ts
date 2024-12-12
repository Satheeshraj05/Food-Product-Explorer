import { NextResponse } from 'next/server';

const OPENFOODFACTS_API = 'https://world.openfoodfacts.org/categories.json';

interface Tag {
    id: string;
    name: string;
    url?: string; // Optional property
}

export async function GET() {
    const response = await fetch(OPENFOODFACTS_API);
    const data = await response.json() as { tags: Tag[] };

    const categories = data.tags.map((tag) => tag.name);

    return NextResponse.json(categories);
}
