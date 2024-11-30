// src/api/api.js
import axios from 'axios'

const buildHeaders = () => {
  console.log('builder headers')

  return {
    'Content-Type': 'application/json',
  }
}

// Create an axios instance
export const api = axios.create({
  baseURL: import.meta.env.VITE_FUSION_PAY_API_BASE_URL, // Base URL from environment variable
  timeout: 10000, // Request timeout
  headers: buildHeaders(),
})

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // Attach auth token if available
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // Handle request errors
    console.log('request error:', error)

    return Promise.reject(error)
  }
)

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response.data // Return data directly
  },
  (error) => {
    // Handle errors
    const { response } = error
    if (axios.isCancel(error)) return
    console.error('API Error:', error)

    if (response) {
      // Server responded with a status code outside of the range of 2xx
      // Handle specific status codes
      switch (response.status) {
        case 401:
          // Handle unauthorized access (e.g., redirect to login)
          break
        case 403:
          // Handle forbidden access
          break
        case 404:
          // Handle not found
          break
        default:
          // Handle generic error
          break
      }
    } else {
      // Network or other error
      console.error('Network Error:', error)
    }

    return Promise.reject(error) // Return the error to be handled by the calling code
  }
)
