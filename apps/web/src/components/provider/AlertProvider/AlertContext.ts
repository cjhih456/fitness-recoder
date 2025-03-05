import type { ReactNode } from 'react';
import { createContext } from 'react'

type AlertType = 'SUCCESS' | 'WARNING' | 'ERROR'

export interface BtnType {
  message: string
  colorClass: string
}

export interface AlertProviderProps {
  children: ReactNode
}

export interface AlertData {
  type: AlertType
  message: string
  important: boolean
  confirm: BtnType
  cancel: BtnType
  resolver: ((_value: boolean | PromiseLike<boolean>) => void) | undefined
}

export type AlertContextType = {
  showAlert: (
    _type: AlertType,
    _message: string,
    _important: boolean,
    _confirm?: BtnType,
    _cancel?: BtnType,
  ) => Promise<boolean>
}

export default createContext<AlertContextType>({
  showAlert: () => { return Promise.resolve(false) }
})