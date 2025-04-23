import type { MenuType } from '@shared/model/menuType'
import { atom } from 'jotai'

export const headerContentAtom = atom<string | undefined>()
export const headerMenuAtom = atom<MenuType[]>([])
