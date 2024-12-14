import { createContext } from 'react'

export type ModalContextType = {
  showModal: (_exerciseId: number) => void
}

export const ModalContext = createContext<ModalContextType>({
  showModal: () => { }
})