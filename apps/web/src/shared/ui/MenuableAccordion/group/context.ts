import { createContext, useContext } from 'react';

type MenuableAccordionGroupContextType = {
  openId: number
  setOpenId: (_id: number) => void
  menuList: number[]
  setMenuList: (_list: number[]) => void
  gotoNext: () => void
}
export const MenuableAccordionGroupContext = createContext<MenuableAccordionGroupContextType>({
  openId: 0,
  setOpenId: () => { },
  menuList: [],
  setMenuList: () => { },
  gotoNext: () => { },
})

export const useMenuableAccordionGroup = () => {
  return useContext(MenuableAccordionGroupContext)
}
