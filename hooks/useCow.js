import useSWR from 'swr'

const fetcher = url => fetch(url).then(res => res.json())
const { API_URL } = process.env
const baseURL = `${API_URL}/cows`

export const useGetCows = () => {
    const { data, error } = useSWR(baseURL, fetcher)

    return {
        data: data ? data.data : null,
        isLoading: !error && !data,
        error
    }
}

export const useGetCow = id => {
    const { data, error } = useSWR(`${baseURL}/${id}`, fetcher)

    return {
        data: data ? data.data : null,
        isLoading: !error && !data,
        error
    }
}
