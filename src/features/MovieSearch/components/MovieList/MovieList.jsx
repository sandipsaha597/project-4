import { useInfiniteScroll } from '../../../../utils/hooks/useInfiniteScroll.js'
import { useMovieSearchContext } from '../../context/useMovieSearchContext.js'
import MovieListItem from '../MovieListItem/MovieListItem.jsx'

const MovieList = () => {
  const { loading, error, moviesData, searchValue, hasMore, loadMore } =
    useMovieSearchContext()

  const observe = useInfiniteScroll({
    loadMore,
    hasMore,
    // threshold: 0.8,
    loading,
  })

  if (searchValue.trim() === '') return <h1>Search input is empty</h1>
  if (moviesData.response === false) return <h1>{moviesData.error}</h1>
  return (
    <>
      {moviesData.movies.map((movie, index) => {
        return (
          <MovieListItem
            ref={moviesData.movies.length === index + 1 ? observe : undefined}
            number={index + 1}
            movieId={movie.imdbID}
            title={movie.Title}
            key={movie.imdbID}
          />
        )
      })}
      {loading && <h1>Loading...</h1>}
      {!loading && hasMore && <button onClick={loadMore}>Load more</button>}
      {error && (
        <h1>
          {error} <button type='button'>Retry</button>
        </h1>
      )}
      {hasMore === false && <h1>{`That's all...`}</h1>}
    </>
  )
}

export default MovieList
