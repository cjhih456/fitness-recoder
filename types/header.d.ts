import { ReactNode } from 'react'

declare global {
  type HeaderContentType = (string | ReactNode)[] | undefined
}
