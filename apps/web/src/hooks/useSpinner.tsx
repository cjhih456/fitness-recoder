import { Spinner } from '@heroui/react'
import { useMemo } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'
import StateRender from '@utils/StateRender'

export default function useSpinner(length: number, loadingVisible: boolean, onLoadMore?: () => void) {
  const { ref: spinnerRef } = useIntersectionObserver({
    threshold: 1,
    onChange(isIntersecting) {
      if (isIntersecting && loadingVisible && length) {
        onLoadMore && onLoadMore()
      }
    },
  })

  // Spinner
  const spinner = useMemo(() => {
    return <div className="flex justify-center" ref={spinnerRef}>
      <StateRender.Boolean
        state={loadingVisible}
        render={{
          true: <Spinner color="primary" size="lg" />
        }}
      />
    </div>
  }, [loadingVisible, spinnerRef])
  return [spinner]
}