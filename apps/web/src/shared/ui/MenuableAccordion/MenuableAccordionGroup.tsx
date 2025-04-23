import type { MenuableAccordionProps } from './MenuableAccordion'
import type { FC, ReactNode } from 'react'
import { useCallback, useMemo, useState } from 'react'
import MenuableAccordion from './MenuableAccordion'
import { MenuableAccordionGroupContext, useMenuableAccordionGroup } from './group/context'

interface MenuableAccordionGroupProviderProps {
  valueList?: number[]
  defaultValue?: number
  children: ReactNode | ((_gotoNext: () => void) => ReactNode)
}
const MenuableAccordionGroupProvider: FC<MenuableAccordionGroupProviderProps> = ({ defaultValue = 0, valueList = [], children }) => {
  const [openId, setOpenId] = useState(defaultValue)
  const [menuList, setMenuList] = useState<number[]>(valueList)
  const gotoNext = useCallback(() => {
    const idx = menuList.indexOf(openId)
    if (idx === -1) {
      setOpenId(menuList[0])
    } else if (menuList[idx + 1]) {
      setOpenId(menuList[idx + 1])
    }
  }, [setOpenId, menuList, openId])
  return <MenuableAccordionGroupContext.Provider value={{ openId, setOpenId, menuList, setMenuList, gotoNext }}>
    {typeof children === 'function' ? children(gotoNext) : children}
  </MenuableAccordionGroupContext.Provider>
}

const MenuableAccordionGroupContent = ({ openId, ...props }: Omit<MenuableAccordionProps, 'isOpen' | 'onOpenChange'> & { openId: any }) => {
  const { setOpenId, openId: openIdContext } = useMenuableAccordionGroup()
  const isOpen = useMemo(() => openId === openIdContext, [openId, openIdContext])
  const setIsOpen = useCallback((v: boolean) => {
    setOpenId(v ? openId : null)
  }, [setOpenId, openId])
  return <MenuableAccordion {...props} onOpenChange={setIsOpen} isOpen={isOpen} />
}

export { MenuableAccordionGroupProvider, MenuableAccordionGroupContent }