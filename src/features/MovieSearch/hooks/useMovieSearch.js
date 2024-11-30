import { useEffect, useState, useCallback } from 'react'
import { useDebounceValue } from '../../../utils/hooks/useDebounce'
import { useFetch } from '../../../utils/hooks/useFetch'

export const useMovieSearch = () => {
  const [searchValue, debouncedSearchValue, setSearchValue] = useDebounceValue(
    '',
    700
  )
  const [moviesData, setMoviesData] = useState({
    response: true,
    movies: [],
  })
  const [page, setPage] = useState(1)
  const { data, error, loading } = useFetch(
    `https://omdbapi.com/?s=${debouncedSearchValue}&apikey=${import.meta.env.VITE_OMDB_API_KEY}&page=${page}`
  )

  const hasMore = (() => {
    if (data?.totalResults) return moviesData.movies.length < data.totalResults
    return true
  })()

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1)
    }
  }, [loading, hasMore])

  useEffect(() => {
    if (data?.Response === 'False') {
      setMoviesData((prev) => ({
        response: false,
        movies: prev.movies,
        error: data.Error,
      }))
      return
    }
    if (data?.Search) {
      setMoviesData((prev) => ({
        response: true,
        movies: [...prev.movies, ...data.Search],
      }))
    }
  }, [data])

  useEffect(() => {
    setMoviesData({
      response: true,
      movies: [],
    })
    setPage(1)
  }, [searchValue])

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
