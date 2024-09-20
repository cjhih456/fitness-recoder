import { Modal, ModalProps } from '@nextui-org/react';
import { useEffect, useMemo, useState } from 'react';

function CModal(args: ModalProps) {
  const [rootDocument, setRootDocument] = useState<Element | undefined>()
  useEffect(() => {
    setRootDocument(document.querySelector('#root > div > div.app') || document.body)
  }, [])
  const { children, ...customArgs } = useMemo(() => {
    return { ...args, portalContainer: rootDocument }
  }, [args, rootDocument])
  return <Modal {...customArgs}>
    {children}
  </Modal>
}

export default CModal