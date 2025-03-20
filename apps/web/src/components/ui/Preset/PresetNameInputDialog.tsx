import type { ReactNode } from 'react';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { useEffect, useState } from 'react'

interface IonChange {
  (_v: false): void | Promise<void>
  (_v: true, _inputValue: string): void | Promise<void>
}

interface PresetNameInputDialogProp {
  isOpen?: boolean
  onChange: IonChange
  children?: (_openFn: () => void) => ReactNode
}

export default function PresetNameInputDialog({ isOpen, onChange, children }: PresetNameInputDialogProp) {

  const [lazyOpen, setLazyOpen] = useState(false)
  const [presetName, setPresetName] = useState('')
  const handleOpen = () => {
    setLazyOpen(true)
  }
  const handleClose = () => {
    setLazyOpen(false)
    onChange(false)
  }
  const handleSave = () => {
    setLazyOpen(false)
    onChange(true, presetName)
    setPresetName('')
  }

  useEffect(() => {
    if (typeof isOpen !== 'boolean') return
    if (isOpen === lazyOpen) return
    setLazyOpen(isOpen)
  }, [isOpen, lazyOpen])

  return (
    <>
      {children && children(handleOpen)}
      <Modal
        closeButton
        isOpen={lazyOpen}
        onOpenChange={handleClose}
      >
        <ModalContent>
          <ModalHeader>
            <p>Set Preset Name</p>
          </ModalHeader>
          <ModalBody>
            <Input label="Name" value={presetName} onValueChange={setPresetName} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}