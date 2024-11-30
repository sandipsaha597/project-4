import { useContext } from 'react'
import { MovieSearchContext } from './MovieSearchContext'

export const useMovieSearchContext = () => {
  const value = useContext(MovieSearchContext)
  return value
}
