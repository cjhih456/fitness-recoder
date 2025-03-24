import { atom } from 'jotai';

export interface BtnType {
  message: string
  colorClass: string
}

export interface AlertData {
  message?: string
  important?: boolean
  confirm?: BtnType
  cancel?: BtnType
  resolver: ((_value: boolean | PromiseLike<boolean>) => void) | undefined
}
export const alertAtom = atom<AlertData[]>([])