import { Spinner } from '@nextui-org/react'
import { useMemo } from 'react'
import { useIntersectionObserver, useIsMounted } from 'usehooks-ts'

export default function useSpinner(length: number, loadingVisible: boolean, onLoadMore?: () => void) {
  const isMounted = useIsMounted()
  const { ref: spinnerRef } = useIntersectionObserver({
    threshold: 1,
    freezeOnceVisible: true,
    onChange(isIntersecting) {
      if (isIntersecting && loadingVisible && length && isMounted()) {
        onLoadMore && onLoadMore()
      }
    },
  })

  // Spinner
  const spinner = useMemo(() => {
    return <div className="flex justify-center" ref={spinnerRef}>
      {loadingVisible ? <Spinner color="primary" size="lg"></Spinner> : <></>}
    </div>
  }, [loadingVisible, spinnerRef])
  return [spinner]
}