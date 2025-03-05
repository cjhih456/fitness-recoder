import type { AlertContextType, AlertData, AlertProviderProps } from './AlertContext';
import { Button, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import CModal from '@components/CustomComponent/CModal'
import AlertContext from './AlertContext'

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const { t } = useTranslation('alert')
  const [alertMessages, setAlertMessages] = useState<AlertData[]>([])
  const [displayMessage, setDisplayMessage] = useState<AlertData | undefined>()

  const contextValue: AlertContextType = {
    showAlert: (type, message, important, confirm, cancel) => {
      const tempObj = {
        type,
        message,
        important,
        confirm,
        cancel,
        resolver: undefined
      } as AlertData
      const promiser = new Promise<boolean>((resolve) => {
        tempObj.resolver = resolve
      })
      setAlertMessages([...alertMessages, tempObj])
      return promiser
    }
  }

  useEffect(() => {
    if (!displayMessage && alertMessages.length) {
      const [tempMessage, ...alertMessageOther] = alertMessages
      setAlertMessages(alertMessageOther)
      setDisplayMessage(tempMessage)
    }
  }, [displayMessage, alertMessages])

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
      <CModal isOpen={Boolean(displayMessage)} onOpenChange={alertAisplayChanged}>
        <ModalContent>
          {() => <>
            <ModalHeader>{t('modal.title')}</ModalHeader>
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
          </>}
        </ModalContent>
      </CModal>
    </AlertContext.Provider>
  )
}