import { useCallback, useEffect, useState } from 'react'

export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(
    async (controller = {}) => {
      if (!url) return

      setLoading(true)
      setError(null)
      const { signal } = controller

      try {
        const response = await fetch(url, {
          method: options.method || 'GET',
          headers: options.headers,
          body: options.body ? JSON.stringify(options.body) : undefined,
          signal,
        })

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const result = await response.json()
        setData(result)
        setLoading(false)
      } catch (err) {
        if (err.name === 'AbortError') return
        setError(err.message || 'Something went wrong')
        setLoading(false)
        console.error(err)
      }
    },
    [url, options.body, options.headers, options.method]
  )

  useEffect(() => {
    const controller = new AbortController()
    fetchData(controller)

    return () => {
      controller.abort()
    }
  }, [fetchData])

  return { data, error, loading, refetch: fetchData }
}
