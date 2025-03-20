import type { AlertContextType, AlertData, AlertProviderProps } from './AlertContext';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import StateRender from '@utils/StateRender';
import AlertContext from './AlertContext'

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const { t } = useTranslation('alert')
  const [alertMessages, setAlertMessages] = useState<AlertData[]>([])
  const [displayMessage, setDisplayMessage] = useState<AlertData | undefined>()

  const contextValue: AlertContextType = {
    showAlert: (options) => {
      const tempObj = {
        ...options,
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

  function alertDisplayChange() {
    if (displayMessage?.important) return
    if (displayMessage?.resolver) {
      displayMessage.resolver(false)
    }
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
      <Modal isOpen={Boolean(displayMessage)} onOpenChange={alertDisplayChange}>
        <ModalContent>
          {() => <>
            <ModalHeader>{t('modal.title')}</ModalHeader>
            <ModalBody>
              <div>
                {displayMessage?.message}
              </div>
            </ModalBody>
            <ModalFooter>
              <StateRender.Boolean
                state={Boolean(displayMessage?.cancel)}
                render={{
                  true: <Button className={displayMessage?.cancel?.colorClass} onPress={cancelAction}>
                    {displayMessage?.cancel?.message}
                  </Button>
                }}
              />
              <StateRender.Boolean
                state={Boolean(displayMessage?.confirm)}
                render={{
                  true: <Button className={displayMessage?.confirm?.colorClass} onPress={confirmAction}>
                    {displayMessage?.confirm?.message}
                  </Button>
                }}
              />
            </ModalFooter>
          </>}
        </ModalContent>
      </Modal>
    </AlertContext.Provider>
  )
}