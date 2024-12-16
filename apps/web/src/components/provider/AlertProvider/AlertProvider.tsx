import type { AlertContextType, AlertData, AlertProviderProps } from './AlertContext';
import { Button, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import CModal from '@components/CustomComponent/CModal'
import AlertContext from './AlertContext'

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const { t } = useTranslation('alert')
  const [alertMessageBuffer, appendAlertMessage] = useState<AlertData[]>([])
  const [displayMessage, setDisplayMessage] = useState<AlertData | undefined>()

  const contextValue: AlertContextType = {
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
  }

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