import { useEffect, useState, useCallback } from 'react'
import { useDebounceValue } from '../../../utils/hooks/useDebounce'
import { useFetch } from '../../../utils/hooks/useFetch'
import { OMDB_API_BASE_URL } from '../constants'

/**
 * A custom hook to search movies and load all the available pages of that list
 *
 */

export const useMovieSearch = () => {
  // State for managing search value and its debounced counterpart
  const [searchValue, debouncedSearchValue, setSearchValue] = useDebounceValue(
    '',
    700
  )

  // State for managing fetched movies and response status
  const [moviesData, setMoviesData] = useState({
    response: true,
    movies: [],
    error: null,
  })

  // State for managing the current page in pagination
  const [page, setPage] = useState(1)

  // Fetch movies based on search and page, only when search value exists
  const { data, error, loading } = useFetch(
    `${OMDB_API_BASE_URL}?s=${debouncedSearchValue}&apikey=${import.meta.env.VITE_OMDB_API_KEY}&page=${page}`,
    { enabled: !!debouncedSearchValue }
  )

  // Calculate whether more movies are available to fetch
  const hasMore = data?.totalResults
    ? moviesData.movies.length < data.totalResults
    : true

  // Function to load the next page of movies
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1)
    }
  }, [loading, hasMore])

  // Effect to handle new movie data and append to the current list
  useEffect(() => {
    // OMDB api return data.Response = False in many cases and also provides an error message
    if (data?.Response === 'False') {
      setMoviesData((prev) => ({
        response: false,
        movies: prev.movies, // Preserve existing movies
        error: data.Error, // Set the error from API response
      }))
      return
    }

    if (data?.Search) {
      setMoviesData((prev) => ({
        response: true,
        movies: [...prev.movies, ...data.Search], // Append new results
        error: null, // Clear previous errors
      }))
    }
  }, [data])

  // Effect to reset movies and page when the search value changes
  useEffect(() => {
    setMoviesData({
      response: true,
      movies: [],
      error: null, // Clear any previous errors on new search
    })
    setPage(1) // Reset page to 1 for new search
  }, [debouncedSearchValue])

  return {
    moviesData,
    loading,
    error,
    hasMore,
    loadMore,
    searchValue,
    setSearchValue,
  }
}
