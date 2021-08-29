import axios from 'axios'

const { API_URL } = process.env

const service = axios.create({
    baseURL: API_URL
})

export default service
