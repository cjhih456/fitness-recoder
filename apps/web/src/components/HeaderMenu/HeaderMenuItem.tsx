import { ReactNode, useMemo } from 'react'

interface HeaderMenuItemProps {
  children?: ReactNode | ReactNode[]
  text?: string
  onClick?: () => void
}

export default function HeaderMenuItem({ children, text, onClick }: HeaderMenuItemProps) {
  const displayMenu = useMemo(() => {
    const menu = []
    if (text) {
      menu.push(<span key={text} className='font-bold text-md'>
        {text}
      </span>)
    }
    if (children) menu.push(children)

    return menu.flat()
  }, [children, text])
  return (
    <div className='flex justify-between items-center h-12 w-36' onClick={onClick}>
      {displayMenu}
    </div>
  )
}
