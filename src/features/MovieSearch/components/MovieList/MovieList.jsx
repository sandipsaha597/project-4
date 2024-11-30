import {
  Box,
  CircularProgress,
  List,
  ListItem,
  Typography,
} from '@mui/material'
import { useInfiniteScroll } from '../../../../utils/hooks/useInfiniteScroll.js'
import { useMovieSearchContext } from '../../context/useMovieSearchContext.js'
import MovieListItem from '../MovieListItem/MovieListItem.jsx'

const MovieList = () => {
  const { loading, error, moviesData, searchValue, hasMore, loadMore } =
    useMovieSearchContext()

  // Observe the last item in the list for infinite scrolling
  const observe = useInfiniteScroll({
    loadMore,
    hasMore,
    loading,
  })

  // Handle empty search input state
  if (searchValue.trim() === '')
    return (
      <Typography textAlign='center' p={5} role='alert' aria-live='polite'>
        Search input is empty
      </Typography>
    )

  // Handle error response from API
  if (moviesData.response === false)
    return (
      <Typography
        color='error'
        textAlign='center'
        p={5}
        role='alert' // Announce error to screen readers
        aria-live='assertive'
      >
        {moviesData.error}
      </Typography>
    )

  return (
    <Box>
      {/* ARIA label to describe the list for screen readers */}
      <List aria-label='List of movies'>
        {moviesData.movies.map((movie, index) => {
          return (
            <ListItem key={movie.imdbID}>
              <MovieListItem
                ref={
                  moviesData.movies.length === index + 1
                    ? observe // Attach observer to the last item for infinite scrolling
                    : undefined
                }
                number={index + 1}
                movieId={movie.imdbID}
                title={movie.Title}
              />
            </ListItem>
          )
        })}
      </List>

      {/* Inform users when there are no more items to load */}
      {hasMore === false && (
        <Typography
          textAlign='center'
          p={5}
          aria-live='polite' // Inform screen readers dynamically
        >
          <i>{`That's all...`}</i>
        </Typography>
      )}

      {/* Display error messages if any */}
      {error && (
        <Typography
          color='error'
          textAlign='center'
          p={5}
          role='alert'
          aria-live='assertive'
        >
          {error}
        </Typography>
      )}

      {/* Show loading spinner while fetching more data */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 200,
        }}
      >
        {loading && (
          <CircularProgress
            role='status' // Announces loading state to screen readers
            aria-live='polite' // Informs screen readers of dynamic updates
            aria-label='Loading more movies...' // Descriptive label for screen readers
          />
        )}
      </Box>
    </Box>
  )
}

export default MovieList
