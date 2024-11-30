import { TextField } from '@mui/material'
import { useMovieSearchContext } from '../../context/useMovieSearchContext'

const MovieSearchBar = () => {
  const { searchValue, setSearchValue } = useMovieSearchContext()
  return (
    <TextField
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      placeholder='eg. Batman'
      label='Search movie'
      variant='outlined'
    />
  )
}

export default MovieSearchBar
