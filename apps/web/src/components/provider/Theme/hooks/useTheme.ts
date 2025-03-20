import { useContext } from 'react'
import { ThemeProviderContext } from '../ThemeProvider'

export default function useTheme() {
  const context = useContext(ThemeProviderContext)
  if (!context) {
    throw new Error('Wrong position')
  }
  return context
}
