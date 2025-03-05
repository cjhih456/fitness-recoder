import type { ReactNode } from 'react'
import StateRender from '@utils/StateRender'

interface HeaderMenuItemProps {
  children?: ReactNode | ReactNode[]
  text?: string
  onClick?: () => void
}

export default function HeaderMenuItem({ children, text, onClick }: HeaderMenuItemProps) {
  return (
    <div className='flex justify-between items-center h-12 w-36' onClick={onClick}>
      <StateRender.Boolean
        state={Boolean(text)}
        render={{
          true: <span key={text} className='font-bold text-md'>
            {text}
          </span>
        }}
      />
      {children}
    </div>
  )
}
