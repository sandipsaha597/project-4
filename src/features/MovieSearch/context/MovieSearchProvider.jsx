import { useMovieSearch } from '../hooks/useMovieSearch'
import { MovieSearchContext } from './MovieSearchContext'

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
