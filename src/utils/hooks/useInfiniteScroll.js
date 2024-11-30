import { useCallback, useRef } from 'react'

/**
 * Custom hook for implementing infinite scroll functionality.
 * Uses IntersectionObserver to detect when a target element becomes visible.
 *
 * @param {Object} options - Configuration options for the infinite scroll.
 * @param {boolean} options.loading - Indicates if data is currently loading.
 * @param {Function} options.loadMore - Function to fetch more data when the target is visible.
 * @param {boolean} options.hasMore - Indicates if there is more data to load.
 * @returns {Function} - A callback ref to attach to the target element for observing.
 */
export const useInfiniteScroll = ({ loading, loadMore, hasMore }) => {
  const observer = useRef() // Ref to store the IntersectionObserver instance.

  /**
   * Callback function to be passed as a ref to the target element.
   * Disconnects any existing observer, and attaches a new observer to the node.
   */
  const observe = useCallback(
    (node) => {
      if (loading) return // Skip if already loading data.

      if (observer.current) {
        // Disconnect the previous observer instance.
        observer.current.disconnect()
      }

      if (node && hasMore) {
        // Create a new IntersectionObserver instance.
        observer.current = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            // When the target element is visible, trigger the loadMore callback.
            loadMore()
          }
        })

        // Start observing the target element.
        observer.current.observe(node)
      }
    },
    [hasMore, loadMore, loading] // Dependencies ensure the callback is re-created when necessary.
  )

  return observe // Return the observe callback for use in the component.
}
