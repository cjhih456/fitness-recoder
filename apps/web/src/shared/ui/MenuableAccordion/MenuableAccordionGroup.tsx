import type { MenuableAccordionProps } from './MenuableAccordion'
import type { ReactNode, Dispatch, SetStateAction } from 'react'
import { useCallback, useMemo, useContext, createContext, useState } from 'react'
import MenuableAccordion from './MenuableAccordion'

const Context = createContext<[any, Dispatch<SetStateAction<any>>]>([0, () => { }])
interface MenuableAccordionGroupProviderProps {
  defaultValue?: number
  children: ReactNode
}
const MenuableAccordionGroupProvider = ({ defaultValue = 0, children }: MenuableAccordionGroupProviderProps) => {
  const providerState = useState(defaultValue)
  return <Context.Provider value={providerState}>{children}</Context.Provider>
}
const MenuableAccordionGroupContent = ({ openId, ...props }: Omit<MenuableAccordionProps, 'isOpen' | 'onOpenChange'> & { openId: any }) => {
  const [state, setState] = useContext(Context)
  const isOpen = useMemo(() => state === openId, [state, openId])
  const setIsOpen = useCallback((v: boolean) => {
    setState(v ? openId : null)
  }, [setState, openId])
  return <MenuableAccordion {...props} onOpenChange={setIsOpen} isOpen={isOpen} />
}

export { MenuableAccordionGroupProvider, MenuableAccordionGroupContent }