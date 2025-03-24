import type { ReactNode } from 'react';
import { createContext } from 'react'

export interface BtnType {
  message: string
  colorClass: string
}

export interface AlertProviderProps {
  children: ReactNode
}

export interface AlertData {
  message?: string
  important?: boolean
  confirm?: BtnType
  cancel?: BtnType
  resolver: ((_value: boolean | PromiseLike<boolean>) => void) | undefined
}

export type AlertContextType = {
  showAlert: (_options: {
    message?: string,
    important?: boolean,
    confirm?: BtnType,
    cancel?: BtnType
  }) => Promise<boolean>
}

export default createContext<AlertContextType>({
  showAlert: () => { return Promise.resolve(false) }
})