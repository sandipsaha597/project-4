import { useMovieSearch } from '../hooks/useMovieSearch'
import { MovieSearchContext } from './MovieSearchContext'

/**
 * MovieSearchProvider
 * This component wraps children with a context provider for movie search functionality.
 * It uses the `useMovieSearch` hook to manage state and expose necessary data and methods.
 *
 */
const MovieSearchProvider = ({ children }) => {
  const {
    loading,
    error,
    moviesData,
    hasMore,
    searchValue,
    setSearchValue,
    loadMore,
  } = useMovieSearch()

  return (
    <MovieSearchContext.Provider
      value={{
        loading,
        error,
        moviesData,
        hasMore,
        searchValue,
        setSearchValue,
        loadMore,
      }}
    >
      {children}
    </MovieSearchContext.Provider>
  )
}

export default MovieSearchProvider
