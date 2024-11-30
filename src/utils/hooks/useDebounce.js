import { useState, useEffect } from 'react'

/**
 * Custom hook for debouncing a value.
 * Useful for delaying state updates like search inputs to improve performance.
 *
 * @param {string} defaultValue - Initial value for the debounce mechanism.
 * @param {number} delay - Delay in milliseconds for the debounce effect.
 * @returns {Array} - [realtimeValue, debouncedValue, setRealtimeValue]
 *   realtimeValue: The current value updated in real-time.
 *   debouncedValue: The value after the debounce delay.
 *   setRealtimeValue: Function to update the real-time value.
 */
export const useDebounceValue = (defaultValue = '', delay = 300) => {
  // State to hold the real-time value (updated immediately).
  const [realtimeValue, setRealtimeValue] = useState(defaultValue)

  // State to hold the debounced value (updated after the delay).
  const [debouncedValue, setDebouncedValue] = useState(defaultValue)

  // Effect to handle debouncing logic.
  useEffect(() => {
    // Set a timeout to update the debounced value after the delay.
    let timeoutId = setTimeout(() => setDebouncedValue(realtimeValue), delay)

    // When realtimeValue changes it clears the previous time and sets new timeout
    return () => clearTimeout(timeoutId)
  }, [realtimeValue, delay]) // Dependency array ensures the effect runs when these values change.

  // Return the current real-time value, debounced value, and a function to update the real-time value.
  return [realtimeValue, debouncedValue, setRealtimeValue]
}
