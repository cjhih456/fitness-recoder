import type { ReactNode } from 'react'

interface BottomNaviAreaProps {
  children: ReactNode
  className: string
}
export default function BottomNaviArea({ children, className }: BottomNaviAreaProps) {
  return <footer className="fixed bottom-0 left-0 right-0 flex justify-center bg-background">
    <div className={`max-w-[640px] w-[640px] ${className}`}>
      {children}
    </div>
  </footer>
}