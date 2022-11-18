import axios from 'axios'

export const API_URL = process.env.REACT_APP_API_URL
export const BACK_URL = process.env.REACT_APP_BACK_URL

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
  return config
})

export default $api
