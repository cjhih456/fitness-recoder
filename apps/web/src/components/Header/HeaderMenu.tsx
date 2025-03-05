import { Button, Popover, PopoverContent, PopoverTrigger, Switch } from '@nextui-org/react';
import { useMemo, useState } from 'react';
import { MdDarkMode, MdLightMode, MdMoreVert } from 'react-icons/md';
import useHeaderContext from '@hooks/provider/Header/useHeaderContext';
import useRootDom from '@hooks/provider/RootDom/useRootDom';
import useThema from '@hooks/provider/Thema/useThema';
import StateRender from '@utils/StateRender';
import HeaderMenuItem from './HeaderMenuItem';

export default function HeaderMenu() {
  const { getRoot } = useRootDom()

  const [isOpen, setIsOpen] = useState(false)
  const { getThema, toggleTheme } = useThema()

  const { getHeaderMenu } = useHeaderContext()
  const headerMenu = useMemo(() => getHeaderMenu().map((menu, idx) => {
    return <HeaderMenuItem key={`menu-${idx}`} text={menu.name} onClick={() => {
      menu.action()
      setIsOpen(false)
    }}></HeaderMenuItem>
  }), [getHeaderMenu])

  return <StateRender.Boolean
    state={Boolean(headerMenu.length)}
    render={{
      true: <Popover isOpen={isOpen} portalContainer={getRoot()} onOpenChange={(open) => setIsOpen(open)}>
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
              onValueChange={toggleTheme}
            ></Switch>
          </HeaderMenuItem>
        </PopoverContent>
      </Popover>,
      false: <Button isIconOnly radius='full' onClick={toggleTheme}>
        <StateRender
          state={getThema()}
          render={{
            'dark': <MdDarkMode />,
            'light': <MdLightMode />
          }}
        />
      </Button>
    }}
  />
}