import { useEffect, useState } from 'react'

export const useDebounceValue = (defaultValue = '', delay = 300) => {
  const [realtimeValue, setRealtimeValue] = useState(defaultValue)
  const [debouncedValue, setDebouncedValue] = useState(defaultValue)

  useEffect(() => {
    let timeoutId = null

    timeoutId = setTimeout(() => setDebouncedValue(realtimeValue), delay)
    return () => clearTimeout(timeoutId)
  }, [realtimeValue, delay])

  return [realtimeValue, debouncedValue, setRealtimeValue]
}
