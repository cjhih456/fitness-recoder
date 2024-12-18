import { Button, Popover, PopoverContent, PopoverTrigger, Switch } from '@nextui-org/react';
import { useMemo, useState } from 'react';
import { MdDarkMode, MdLightMode, MdMoreVert } from 'react-icons/md';
import useHeaderContext from '@hooks/provider/Header/useHeaderContext';
import useRootDom from '@hooks/provider/RootDom/useRootDom';
import useThema from '@hooks/provider/Thema/useThema';
import HeaderMenuItem from './HeaderMenuItem';

export default function HeaderMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { getThema, setThema } = useThema()
  const headerContext = useHeaderContext()
  const headerMenu = useMemo(() => headerContext.getHeaderMenu().map((menu, idx) => {
    return <HeaderMenuItem key={`menu-${idx}`} text={menu.name} onClick={() => {
      menu.action()
      setIsOpen(false)
    }}></HeaderMenuItem>
  }), [headerContext])
  const { getRoot } = useRootDom()
  const singleVersion = useMemo(() => <Button isIconOnly radius='full' onClick={() => {
    setThema(getThema() === 'dark' ? 'light' : 'dark')
  }}>
    {getThema() === 'dark' ? <MdDarkMode /> : <MdLightMode />}
  </Button>, [getThema, setThema])
  const multiVersion = useMemo(() => <Popover isOpen={isOpen} portalContainer={getRoot()} onOpenChange={(open) => setIsOpen(open)}>
    <PopoverTrigger>
      <Button isIconOnly variant='light' radius='full' >
        <MdMoreVert size="2rem" preserveAspectRatio="xMidYMid slice" />
      </Button>
    </PopoverTrigger>
    <PopoverContent>
      {headerMenu}
      <HeaderMenuItem text="Thema">
        <Switch
          isSelected={getThema() === 'dark'}
          startContent={<MdLightMode />}
          endContent={<MdDarkMode />}
          onValueChange={() => {
            setThema(getThema() === 'dark' ? 'light' : 'dark')
          }}
        ></Switch>
      </HeaderMenuItem>
    </PopoverContent>
  </Popover>, [getThema, getRoot, isOpen, setThema, headerMenu])
  return <>
    {headerMenu.length ? multiVersion : singleVersion}
  </>
}