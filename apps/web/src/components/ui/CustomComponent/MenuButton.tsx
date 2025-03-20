import type { IconType } from 'react-icons';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

interface MenuButtonProps { name: string, Icon: IconType, path: string }

export default function MenuButton({ name, Icon, path }: MenuButtonProps) {
  const navigate = useNavigate()
  function onClickAction() {
    navigate(path)
  }
  return <Button radius='none' variant='light' size="lg" className="h-unit-14" onClick={onClickAction}>
    <div className="items-center flex flex-col">
      <Icon size="1.5rem"></Icon>
      <p>
        {name}
      </p>
    </div>
  </Button>
}