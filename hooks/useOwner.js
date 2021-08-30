import useSWR from 'swr'

const baseURL = `/owners`

export const useGetOwners = () => {
    const { data, error } = useSWR(baseURL)

    return {
        data: data ? data.data : [],
        isLoading: !error && !data,
        error
    }
}

export const useGetOwner = id => {
    const { data, error } = useSWR(`${baseURL}/${id}`)

    return {
        data: data ? data.data : {},
        isLoading: !error && !data,
        error
    }
}
