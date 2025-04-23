import type { IconType } from 'react-icons';
import { Button } from '@heroui/react';
import { useNavigate } from 'react-router-dom';

interface BottomMenuButtonProps { name: string, Icon: IconType, path: string }

export default function BottomMenuButton({ name, Icon, path }: BottomMenuButtonProps) {
  const navigate = useNavigate()
  function onClickAction() {
    navigate(path)
  }
  return <Button radius='none' variant='light' size="lg" className="h-unit-14" onPress={onClickAction}>
    <div className="items-center flex flex-col">
      <Icon size="1.5rem"></Icon>
      <p>
        {name}
      </p>
    </div>
  </Button>
}