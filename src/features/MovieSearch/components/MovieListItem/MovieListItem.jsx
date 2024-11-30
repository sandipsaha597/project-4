import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Typography,
} from '@mui/material'
import { forwardRef, useState } from 'react'
import { ArrowDownSVG } from '../../../../assets/icons/ArrowDownSVG.jsx'
import { useMovieDetails } from '../../hooks/useMovieDetails'
import MovieDetailsUI from '../MovieDetailsUI/MovieDetailtsUI.jsx'

const MovieListItem = forwardRef(function MovieListItem(
  { title, number, movieId },
  ref
) {
  // when fetchMovieDetails is called, it fetches data and updates the internal
  // data state and the component re-renders
  const { data, error, loading, fetchMovieDetails } = useMovieDetails()
  const [expanded, setExpanded] = useState(false)

  // Toggles the expanded state of the accordion and fetches movie details if needed
  const handleToggle = async () => {
    setExpanded((prev) => !prev)

    if (!expanded && data === null) {
      // Fetch movie details when the accordion expands for the first time
      await fetchMovieDetails(movieId)
    }
  }

  return (
    <Accordion
      ref={ref}
      expanded={expanded}
      onChange={handleToggle}
      sx={{ width: '100%', boxSizing: 'border-box' }}
      // ARIA role for Accordion and expand/collapse action
      aria-expanded={expanded}
      aria-labelledby={`accordion-summary-${movieId}`} // Link to the summary for screen readers
    >
      <AccordionSummary
        expandIcon={<ArrowDownSVG />}
        aria-label={`Toggle details for ${title}`} // Descriptive label for screen readers
        id={`accordion-summary-${movieId}`} // Unique ID for screen readers
      >
        <Typography>
          {number}. {title}
        </Typography>
      </AccordionSummary>

      <AccordionDetails
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 300,
        }}
      >
        {/* Show loading spinner while the movie details are being fetched */}
        {/* Announce loading state */}
        {loading && <CircularProgress aria-live='polite' />}
        {/* Show error message if fetching fails */}
        {error && (
          <Typography
            color='error'
            textAlign='center'
            p={5}
            aria-live='assertive'
          >
            {error}
          </Typography>
        )}
        {/* Render movie details UI when data is available and loading has finished */}
        {!loading && !error && <MovieDetailsUI movieDetails={data || {}} />}
      </AccordionDetails>
    </Accordion>
  )
})

export default MovieListItem
