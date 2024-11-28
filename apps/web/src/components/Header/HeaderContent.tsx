import { useMemo } from 'react'
import { useHeaderContext } from '../provider/Header/useHeaderContext'

export default function HeaderContent() {
  const headerContext = useHeaderContext()
  const headerContent = useMemo(() => {
    return headerContext.getHeaderContent()
  }, [headerContext])
  return <>
    {headerContent}
  </>
}