import { useState } from 'react'

const fetchMovieDetailsById = async (movieId) => {
  const response = await fetch(
    `https://omdbapi.com/?i=${movieId}&apikey=${import.meta.env.VITE_OMDB_API_KEY}`
  )
  if (!response.ok) {
    throw new Error('Failed to fetch movie details')
  }
  return response.json()
}

export const useMovieDetails = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchMovieDetails = async (movieId) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetchMovieDetailsById(movieId)
      setData(response)
    } catch (err) {
      setError(err.message || 'Failed to fetch movie details')
    } finally {
      setLoading(false)
    }
  }

  return { fetchMovieDetails, data, loading, error }
}

// export const useMovieDetails = () => {
//   const [movieDetails, setMovieDetails] = useState({})
//   const getMovieDetails = useCallback(
//     async (movieId) => {
//       if (movieDetails[movieId]) return
//       setMovieDetails((prev) => {
//         const temp = { ...prev }
//         temp[movieId] = {
//           state: 'loading',
//         }
//       })

//       try {
//         const data = await fetchMovieDetails(movieId)
//         setMovieDetails((prev) => {
//           const temp = { ...prev }
//           temp[movieId] = {
//             state: 'success',
//             data,
//           }
//         })
//       } catch (err) {
//         setMovieDetails((prev) => {
//           const temp = { ...prev }
//           temp[movieId] = {
//             state: 'error',
//             errorMsg: err.message,
//           }
//         })
//       }
//     },
//     [movieDetails]
//   )

//   return { movieDetails, getMovieDetails }
// }
