import { Modal, ModalProps } from '@nextui-org/react';
import { useMemo } from 'react';
import { useRoot } from '@provider/RootDomProvider';

function CModal(args: ModalProps) {
  const { getRoot } = useRoot()
  const { children, ...customArgs } = useMemo(() => {
    return { ...args, portalContainer: getRoot() }
  }, [args, getRoot])
  return <Modal {...customArgs}>
    {children}
  </Modal>
}

export default CModal