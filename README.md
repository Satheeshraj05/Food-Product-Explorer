# Food Product Explorer

## Overview

**Food Product Explorer** is a web application that allows users to search, filter, and view detailed information about food products using the OpenFoodFacts API. This project is built with **Next.js 15**, **React**, and **Tailwind CSS**, providing a responsive and user-friendly interface for exploring food product data.

## Features

- **Product Search**: Search for food products by name or barcode.
- **Category Filtering**: Filter products by categories fetched from the OpenFoodFacts API.
- **Sorting**: Sort products by name or nutrition grade.
- **Detailed Product View**: View comprehensive information about each product, including:
  - Product name and image
  - Ingredients list
  - Nutritional information (energy, fat, carbs, proteins)
  - Product labels (e.g., vegan, gluten-free)
- **Responsive Design**: Fully responsive layout for both desktop and mobile devices.
- **Barcode Search**: Ability to search for products using their barcode.
- **Add/Edit Products**: Interface for adding or editing product details (note: this feature currently simulates actions and does not persist data).

## Technologies Used

- **Next.js 15** (React framework for server-side rendering)
- **React** (UI library for building components)
- **Tailwind CSS** (Utility-first CSS framework)
- **SWR** (For data fetching and caching)
- **Heroicons** (Icons used in the UI)
- **TypeScript** (Static type checking for better code quality)
- **OpenFoodFacts API** (External API for retrieving product data)

## Getting Started

### Prerequisites

Before starting, ensure that you have the following installed:

- **Node.js** (v14 or later)
- **Yarn** or **npm**

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/food-product-explorer.git
cd food-product-explorer
Install dependencies:
bash
Copy code
yarn install
# or using npm
npm install
Start the development server:
bash
Copy code
yarn dev
# or using npm
npm run dev
The app will be running at http://localhost:3000.

API Endpoints
This project uses the OpenFoodFacts API to fetch data. Below are the key endpoints used in the application:

Search Products by Name:
GET https://world.openfoodfacts.org/cgi/search.pl?search_terms={name}&json=true

Get Products by Category:
GET https://world.openfoodfacts.org/category/{category}.json

Get Product Details by Barcode:
GET https://world.openfoodfacts.org/api/v0/product/{barcode}.json

Example query for product details by barcode:
https://world.openfoodfacts.org/api/v0/product/737628064502.json

Features in Detail
1. Homepage
Displays a list of food products fetched from the OpenFoodFacts API.
Each product shows:
Name
Image
Category
Ingredients (if available)
Nutrition grade (A, B, C, D, E)
Pagination: Products can be paginated, with either infinite scroll or load-more functionality.
2. Search Functionality
A search bar on the homepage allows users to search for food products by name.
The product list is filtered based on the search query.
3. Barcode Search
A separate search bar allows users to search for products by barcode.
4. Category Filter
Users can filter products by categories (e.g., beverages, dairy, snacks).
The categories are fetched from the OpenFoodFacts API.
5. Sort Functionality
Users can sort products by:
Product name (A-Z, Z-A)
Nutrition grade (ascending or descending)
6. Product Detail Page
Clicking on a product redirects to a detailed page that displays:
Product image
Full list of ingredients
Nutritional values (e.g., energy, fat, carbs, proteins)
Labels (e.g., vegan, gluten-free)
7. Responsive Design
The app is fully responsive and works well on both mobile and desktop screens.
Folder Structure
The folder structure is as follows:

bash
Copy code
/food-product-explorer
├── /public                # Public assets (images, etc.)
├── /src
│   ├── /components        # React components (ProductList, ProductCard, etc.)
│   ├── /pages             # Pages (index.tsx, [id].tsx for product details)
│   ├── /styles            # TailwindCSS configuration and custom styles
│   └── /utils             # Utility functions for API calls and helpers
└── tailwind.config.js     # Tailwind CSS configuration
