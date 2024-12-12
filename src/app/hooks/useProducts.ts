import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useProducts(page: number, search: string, isBarcode: boolean, category: string, sort: string) {
    const { data, error, isLoading } = useSWR(
        `/api/products?page=${page}&search=${search}&category=${category}&sort=${sort}`,
        fetcher
    )

    return {
        products: data?.products,
        totalProducts: data?.total,
        isLoading,
        isError: error
    }
}

