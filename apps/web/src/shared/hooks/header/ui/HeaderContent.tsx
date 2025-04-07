import { useAtom } from 'jotai'
import { headerContentAtom } from '../lib/atom'

export default function HeaderContent() {
  const [header] = useAtom(headerContentAtom)
  return <span className="font-bold text-lg"> {header} </span>
}