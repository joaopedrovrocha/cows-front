import useSWR from 'swr'

const baseURL = `/cows`

export const useGetCows = () => {
    const { data, error } = useSWR(baseURL)

    return {
        data: data ? data.data : [],
        isLoading: !error && !data,
        error
    }
}

export const useGetCow = id => {
    const { data, error } = useSWR(`${baseURL}/${id}`)

    return {
        data: data ? data.data : {},
        isLoading: !error && !data,
        error
    }
}
