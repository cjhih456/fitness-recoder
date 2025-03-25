import { atom } from 'jotai'

export type MenuType = {
  name: string
  action: () => void
}

export const headerContentAtom = atom<string | undefined>()
export const headerMenuAtom = atom<MenuType[]>([])
