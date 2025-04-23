import type { ReactNode } from 'react';
import { Spinner } from '@heroui/react'
import { useMemo } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'
import { BooleanRender } from '@shared/ui/StateRender'

interface useSpinnerProps {
  visible: boolean
  loadMore?: () => void
}

export default function useSpinner({
  visible = true,
  loadMore: onLoadMore
}: useSpinnerProps): [ReactNode] {
  const { ref: spinnerRef } = useIntersectionObserver({
    threshold: 1,
    onChange(isIntersecting) {
      if (isIntersecting) {
        onLoadMore && onLoadMore()
      }
    },
  })

  // Spinner
  const spinner = useMemo(() => {
    return <div className="flex justify-center">
      <BooleanRender
        state={visible}
        render={{
          true: () => <Spinner color="primary" size="lg" ref={spinnerRef} />
        }}
      />
    </div>
  }, [visible, spinnerRef])
  return [spinner]
}