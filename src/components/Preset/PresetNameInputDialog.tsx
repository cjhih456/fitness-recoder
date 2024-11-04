import { Button, Input, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { ReactNode, useEffect, useState } from 'react'
import CModal from '../CustomComponent/CModal'

interface IonChange {
  (v: false): void | Promise<void>
  (v: true, inputValue: string): void | Promise<void>
}

interface PresetNameInputDialogProp {
  isOpen?: boolean
  onChange: IonChange
  children?: (openFn: () => void) => ReactNode
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
  }, [isOpen])

  return (
    <>
      {
        children && children(handleOpen)
      }
      <CModal
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
      </CModal>
    </>
  )
}