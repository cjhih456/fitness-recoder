import { Button, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { ReactNode, createContext, useEffect, useMemo, useState } from 'react'
import CModal from '../../CustomComponent/CModal'

enum AlertType {
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
}

export interface BtnType {
  message: string
  colorClass: string
}

export interface AlertProviderProps {
  children: ReactNode
}

export interface AlertData {
  type: keyof typeof AlertType
  message: string
  important: boolean
  confirm: BtnType | false
  cancel: BtnType | false
  resolver: ((value: boolean | PromiseLike<boolean>) => void) | undefined
}

type AlertContextType = {
  showAlert: (
    type: keyof typeof AlertType,
    message: string,
    important: boolean,
    confirm?: BtnType | false,
    cancel?: BtnType | false,
  ) => Promise<boolean>
}

export const AlertContext = createContext<AlertContextType>({
  showAlert: () => { return Promise.resolve(false) }
})

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [alertMessageBuffer, appendAlertMessage] = useState<AlertData[]>([])
  const [displayMessage, setDisplayMessage] = useState<AlertData | undefined>()

  const contextValue = {
    showAlert: (type, message, important, confirm, cancel) => {
      const tempObj = {
        type,
        message,
        important,
        confirm: confirm || false,
        cancel: cancel || false,
        resolver: undefined
      } as AlertData
      const promiser = new Promise<boolean>((resolve) => {
        tempObj.resolver = resolve
      })
      appendAlertMessage([...alertMessageBuffer, tempObj])
      return promiser
    }
  } as AlertContextType

  useEffect(() => {
    if (!displayMessage && alertMessageBuffer.length) {
      const [tempMessage, ...alertMessageOther] = alertMessageBuffer
      appendAlertMessage(alertMessageOther)
      setDisplayMessage(tempMessage)
    }
  }, [displayMessage, alertMessageBuffer])

  const displayAlert = useMemo(() => Boolean(displayMessage), [displayMessage])

  function alertAisplayChanged() {
    if (displayMessage?.important) return
    displayMessage?.resolver && displayMessage.resolver(false)
    setDisplayMessage(undefined)
  }
  function cancelAction() {
    if (!displayMessage?.resolver) return
    displayMessage.resolver(false)
    setDisplayMessage(undefined)
  }
  function confirmAction() {
    if (!displayMessage?.resolver) return
    displayMessage.resolver(true)
    setDisplayMessage(undefined)
  }

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
      <CModal isOpen={displayAlert} onOpenChange={alertAisplayChanged}>
        <ModalContent>
          {() => (<>
            <ModalHeader>Alert!!</ModalHeader>
            <ModalBody>
              <div>
                {displayMessage?.message}
              </div>
            </ModalBody>
            <ModalFooter>
              {
                displayMessage?.cancel &&
                <Button className={displayMessage.cancel.colorClass} onPress={cancelAction}>
                  {displayMessage.cancel.message}
                </Button>
              }
              {
                displayMessage?.confirm &&
                <Button className={displayMessage.confirm.colorClass} onPress={confirmAction}>
                  {displayMessage.confirm.message}
                </Button>
              }
            </ModalFooter>
          </>)}
        </ModalContent>
      </CModal>
    </AlertContext.Provider>
  )
}