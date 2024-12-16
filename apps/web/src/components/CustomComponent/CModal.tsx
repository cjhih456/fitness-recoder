import type { ModalProps } from '@nextui-org/react';
import { Modal } from '@nextui-org/react';
import { useMemo } from 'react';
import useRootDom from '@hooks/provider/RootDom/useRootDom';

function CModal(args: ModalProps) {
  const { getRoot } = useRootDom()
  const { children, ...customArgs } = useMemo(() => {
    return { ...args, portalContainer: getRoot() }
  }, [args, getRoot])
  return <Modal {...customArgs}>
    {children}
  </Modal>
}

export default CModal