import MovieSearchProvider from '../../context/MovieSearchProvider.jsx'
import MovieList from '../MovieList/MovieList.jsx'
import MovieSearchBar from '../MovieSearchBar/MovieSearchBar.jsx'

const MovieSearch = () => {
  return (
    <MovieSearchProvider>
      <MovieSearchBar />
      <MovieList />
    </MovieSearchProvider>
  )
}

export default MovieSearch
