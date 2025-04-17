import type { AlertData } from '../atom';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BooleanRender } from '@shared/ui/StateRender';
import useAlert from '../hooks/useAlert';

const AlertModal = () => {
  const { t } = useTranslation('alert')
  const { alertList, setAlertList } = useAlert()
  const [displayMessage, setDisplayMessage] = useState<AlertData>()

  useEffect(() => {
    if (!displayMessage && alertList.length) {
      const [tempMessage, ...alertMessageOther] = alertList
      setAlertList(alertMessageOther)
      setDisplayMessage(tempMessage)
    }
  }, [displayMessage, alertList, setAlertList])

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

  return <Modal isOpen={Boolean(displayMessage)} onOpenChange={alertDisplayChange}>
    <ModalContent>
      {() => <>
        <ModalHeader>{t('modal.title')}</ModalHeader>
        <ModalBody>
          <div>
            {displayMessage?.message}
          </div>
        </ModalBody>
        <ModalFooter>
          <BooleanRender
            state={Boolean(displayMessage?.cancel)}
            render={{
              true: () => <Button className={displayMessage?.cancel?.colorClass} onPress={cancelAction}>
                {displayMessage?.cancel?.message}
              </Button>
            }}
          />
          <BooleanRender
            state={Boolean(displayMessage?.confirm)}
            render={{
              true: () => <Button className={displayMessage?.confirm?.colorClass} onPress={confirmAction}>
                {displayMessage?.confirm?.message}
              </Button>
            }}
          />
        </ModalFooter>
      </>}
    </ModalContent>
  </Modal>
}
export default AlertModal