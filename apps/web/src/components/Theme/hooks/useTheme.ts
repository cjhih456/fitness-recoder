import { useContext } from 'react'
import ThemeProviderContext from '@components/Theme/ThemeProvider/ThemeProviderContext'

export default function useTheme() {
  const context = useContext(ThemeProviderContext)
  if (!context) {
    throw new Error('Wrong position')
  }
  return context
}
