import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { themeAtom } from './atom'

export default function useTheme(willChangeAttribute: boolean = false) {
  const [theme, setTheme] = useAtom(themeAtom)
  useEffect(() => {
    if (!willChangeAttribute) return
    const item = document.getElementsByTagName('html')
    item[0].setAttribute('data-theme', theme)
  }, [theme, willChangeAttribute])
  return {
    theme,
    toggleTheme: () => {
      setTheme((before) => before === 'dark' ? 'light' : 'dark')
    }
  }
}