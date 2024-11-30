import { Box, TextField } from '@mui/material'
import { useMovieSearchContext } from '../../context/useMovieSearchContext'

const MovieSearchBar = () => {
  const { searchValue, setSearchValue } = useMovieSearchContext()
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: '#fff',
        py: 2,
      }}
    >
      <TextField
        sx={{
          width: {
            xs: '90%',
            sm: '40%',
          },
        }}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder='eg. Batman'
        label='Search movie'
        variant='outlined'
      />
    </Box>
  )
}

export default MovieSearchBar
