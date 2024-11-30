import { useState } from 'react'
import { OMDB_API_BASE_URL } from '../constants'

/**
 * Helper function to fetch movie details by ID.
 *
 * @param {string} movieId - The IMDb ID of the movie to fetch details for.
 * @returns {Promise<Object>} - The movie details as a JSON object.
 * @throws Will throw an error if the fetch fails.
 */
const fetchMovieDetailsById = async (movieId) => {
  const response = await fetch(
    `${OMDB_API_BASE_URL}?i=${movieId}&apikey=${import.meta.env.VITE_OMDB_API_KEY}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch movie details')
  }

  return response.json()
}

/**
 * Custom hook for managing movie details fetching.
 *
 * @returns {Object} - An object containing the fetch function, fetched data, loading state, and errors.
 */
export const useMovieDetails = () => {
  const [data, setData] = useState(null) // Stores the fetched movie details.
  const [loading, setLoading] = useState(false) // Indicates the loading state.
  const [error, setError] = useState(null) // Stores any error messages.

  /**
   * Fetches movie details by IMDb ID and updates state.
   *
   * @param {string} movieId - The IMDb ID of the movie.
   */
  const fetchMovieDetails = async (movieId) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetchMovieDetailsById(movieId)
      setData(response) // Update state with the fetched data.
    } catch (err) {
      setError(err.message || 'Failed to fetch movie details')
    } finally {
      setLoading(false) // Ensure loading state is reset.
    }
  }

  return { fetchMovieDetails, data, loading, error }
}
