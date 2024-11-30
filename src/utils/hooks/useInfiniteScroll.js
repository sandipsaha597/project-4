import { useCallback, useRef } from 'react'

export const useInfiniteScroll = ({
  loading,
  loadMore,
  hasMore,
  threshold = 0.8,
}) => {
  const observer = useRef()

  const observe = useCallback(
    (node) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()

      if (node && hasMore) {
        observer.current = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              loadMore() // Trigger the loadMore callback
            }
          },
          { threshold }
        )
        observer.current.observe(node)
      }
    },
    [hasMore, loadMore, threshold, loading]
  )

  return observe
}
