import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import { forwardRef, useState } from 'react'
import { useMovieDetails } from '../../hooks/useMovieDetails'

const MovieListItem = forwardRef(function MovieListItem(
  { title, number, movieId },
  ref
) {
  const { data, error, loading, fetchMovieDetails } = useMovieDetails()
  const [expanded, setExpanded] = useState(false)

  const handleToggle = async () => {
    setExpanded((prev) => !prev)

    if (!expanded && data === null) {
      // Fetch movie details when the accordion expands
      await fetchMovieDetails(movieId)
    }
  }

  return (
    <Accordion ref={ref} expanded={expanded} onChange={handleToggle}>
      <AccordionSummary
      // expandIcon={<ExpandMoreIcon />}
      >
        {number}. {title}
      </AccordionSummary>
      <AccordionDetails>
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>{error}</h1>
        ) : (
          JSON.stringify(data, null, 2)
        )}
      </AccordionDetails>
    </Accordion>
  )
})

export default MovieListItem
