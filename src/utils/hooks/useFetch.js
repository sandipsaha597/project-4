import { useCallback, useEffect, useState } from 'react'

/**
 * Custom hook for fetching data.
 *
 * @param {string} url - The API endpoint to fetch data from.
 * @param {Object} options - Configuration options for the fetch request.
 * @param {string} [options.method='GET'] - HTTP method (GET, POST, etc.).
 * @param {Object} [options.headers={}] - HTTP headers for the request.
 * @param {Object} [options.body] - Request body (for POST, PUT, etc.).
 * @param {boolean} [options.enabled=true] - Whether the request should be automatically triggered.
 * @returns {Object} - { data, error, loading, refetch }
 *   data: The fetched data.
 *   error: Any error encountered during the request.
 *   loading: Whether the request is in progress.
 *   refetch: Function to manually trigger the request.
 */
export const useFetch = (url, options = {}) => {
  // State to store the fetched data.
  const [data, setData] = useState(null)

  // State to store any error encountered.
  const [error, setError] = useState(null)

  // State to track loading status.
  const [loading, setLoading] = useState(true)

  /**
   * Function to perform the fetch request.
   * Uses `useCallback` to memoize and prevent unnecessary re-creations.
   */
  const fetchData = useCallback(
    async (controller = {}) => {
      if (!url || !options.enabled) return // Skip fetching if no URL or fetching is disabled.

      setLoading(true) // Set loading to true before the request.
      setError(null) // Clear previous errors.

      const { signal } = controller // Signal for aborting the fetch request.

      try {
        const response = await fetch(url, {
          method: options.method || 'GET', // HTTP method (default is GET).
          headers: options.headers, // Optional headers.
          body: options.body ? JSON.stringify(options.body) : undefined, // Optional request body.
          signal, // Abort signal for cancellation.
        })

        if (!response.ok) {
          // Handle HTTP errors.
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const result = await response.json() // Parse JSON response.
        setData(result) // Set the fetched data.
        setLoading(false) // Set loading to false on success.
      } catch (err) {
        if (err.name === 'AbortError') return // Ignore abort errors (expected behavior).
        setError(err.message || 'Something went wrong') // Set error message.
        setLoading(false) // Set loading to false on failure.
        console.error(err) // Log error for debugging.
      }
    },
    [url, options.body, options.headers, options.method, options.enabled] // Dependencies for memoization.
  )

  // Effect to trigger the fetch on URL or options change.
  // When url or options with change it will recreate the
  // fetchData function therefore it will run the useEffect
  useEffect(() => {
    const controller = new AbortController() // Create an AbortController instance.
    fetchData(controller) // Trigger the fetch.

    return () => {
      controller.abort() // Cleanup: abort fetch if component unmounts or dependencies change.
    }
  }, [fetchData]) // Re-run the effect if fetchData changes.

  // Return the fetched data, error, loading state, and a refetch function.
  return { data, error, loading, refetch: fetchData }
}
