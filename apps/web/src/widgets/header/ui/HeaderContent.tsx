import { useHeaderValue } from '@shared/hooks/header/useHeaderHandler'

export default function HeaderContent() {
  const header = useHeaderValue()
  return <span className="font-bold text-lg"> {header} </span>
}