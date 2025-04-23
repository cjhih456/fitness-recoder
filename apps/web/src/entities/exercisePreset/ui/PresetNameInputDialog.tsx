import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'
import { useState } from 'react'

interface PresetNameInputDialogProp {
  isOpen?: boolean
  onSubmit: (_v: string) => void,
  onOpenChange: (_v: boolean) => void
}

const PresetNameInputDialog = ({ isOpen, onSubmit, onOpenChange }: PresetNameInputDialogProp) => {
  const [presetName, setPresetName] = useState('')
  const handleClose = () => {
    onOpenChange(false)
    setPresetName('')
  }
  const handleSave = () => {
    onSubmit(presetName)
    handleClose()
  }

  return (
    <Modal
      closeButton
      isOpen={isOpen}
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
          <Button onPress={handleClose}>Cancel</Button>
          <Button onPress={handleSave}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

interface WithChildProp {
  children: (_openFn: () => void) => React.ReactNode
  onSubmit: (_v: string) => void
}
const WithChild = ({ children, onSubmit }: WithChildProp) => {
  const [lazyOpen, setLazyOpen] = useState(false)

  const handleOpen = () => {
    setLazyOpen(true)
  }

  return <>
    {children && children(handleOpen)}
    <PresetNameInputDialog isOpen={lazyOpen} onSubmit={onSubmit} onOpenChange={setLazyOpen} />
  </>
}

PresetNameInputDialog.WithChild = WithChild

export default PresetNameInputDialog