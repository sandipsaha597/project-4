import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'

/**
 * A presentational UI component with no states
 * It takes movieDetails and shows poster and details of a movie
 *
 */

const MovieDetailsUI = ({ movieDetails }) => {
  return (
    <Card sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
        }}
      >
        {/* Display movie poster only if available */}
        {movieDetails.Poster !== 'N/A' && (
          <Box>
            <CardMedia
              sx={{
                objectFit: 'contain',
                height: '300px',
                width: '202px',
              }}
              component='img'
              image={movieDetails.Poster}
              alt={`${movieDetails.Title} poster`} // Accessible alt text for the poster
            />
          </Box>
        )}

        {/* Movie details section */}
        <Box>
          <CardContent>
            {/* Display movie year */}
            <Typography variant='body1' color='textSecondary'>
              <strong>Year:</strong>{' '}
              <span aria-label={`Year of release ${movieDetails.Year}`}>
                {movieDetails.Year}
              </span>
            </Typography>

            {/* Display movie genre */}
            <Typography variant='body1' color='textSecondary'>
              <strong>Genre:</strong>{' '}
              <span aria-label={`Genre ${movieDetails.Genre}`}>
                {movieDetails.Genre}
              </span>
            </Typography>

            {/* Display director name */}
            <Typography variant='body1' color='textSecondary'>
              <strong>Director:</strong>{' '}
              <span aria-label={`Director ${movieDetails.Director}`}>
                {movieDetails.Director}
              </span>
            </Typography>

            {/* Display language of the movie */}
            <Typography variant='body1' color='textSecondary'>
              <strong>Language:</strong>{' '}
              <span aria-label={`Language ${movieDetails.Language}`}>
                {movieDetails.Language}
              </span>
            </Typography>

            {/* Display release date */}
            <Typography variant='body1' color='textSecondary'>
              <strong>Released:</strong>{' '}
              <span aria-label={`Released on ${movieDetails.Released}`}>
                {movieDetails.Released}
              </span>
            </Typography>

            {/* Display movie plot */}
            <Typography
              variant='body1'
              color='textSecondary'
              sx={{ marginTop: 2 }}
              aria-label={`Plot summary: ${movieDetails.Plot}`}
            >
              <strong>Plot:</strong> {movieDetails.Plot}
            </Typography>
          </CardContent>
        </Box>
      </Box>
    </Card>
  )
}

export default MovieDetailsUI
