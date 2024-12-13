import { DocumentNode, OperationVariables, StoreObject, useFragment, useLazyQuery } from '@apollo/client'
import { useCallback, useEffect, useRef } from 'react'

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
  const loadCallback = useCallback((options: LV & StoreObject) => {
    return load({
      variables: options
    })
  }, [])
  const calledOptionStr = useRef<string>('')
  useEffect(() => {
    const tempStr = JSON.stringify(options)
    if (!complete && calledOptionStr.current !== tempStr) {
      calledOptionStr.current = tempStr
      // console.trace('fragment called: ', fragment, options, data)
      loadCallback(options)
    }
  }, [complete, options, loadCallback])
  // const computedFitnessData = useMemo<T>(() => {
  //   return (called ?  : data)
  // }, [called, data, loadedData])
  return [data as T]
}