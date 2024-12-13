import { DocumentNode, OperationVariables, StoreObject, useFragment, useLazyQuery } from '@apollo/client'
import { useEffect, useRef } from 'react'

interface BaseObj extends StoreObject {
  id: number
}

export default function useFixedFragment<
  T extends BaseObj,
  LR,
  LV extends OperationVariables
>(
  fragment: DocumentNode,
  lazyQuery: () => ReturnType<typeof useLazyQuery<LR, LV>>,
  options: LV & StoreObject
) {
  const { data, complete } = useFragment<T>({
    fragment,
    from: options
  })
  const [load] = lazyQuery()
  const calledOptionStr = useRef<string>('')
  useEffect(() => {
    const tempStr = JSON.stringify(options)
    if (!complete && calledOptionStr.current !== tempStr) {
      calledOptionStr.current = tempStr
      load({
        variables: options
      })
    }
  }, [complete, options, load])
  return [data as T]
}