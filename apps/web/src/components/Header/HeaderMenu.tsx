import { Button, Popover, PopoverContent, PopoverTrigger, Switch } from '@nextui-org/react';
import { useMemo, useState } from 'react';
import { MdDarkMode, MdLightMode, MdMoreVert } from 'react-icons/md';
import useTheme from '@components/Theme/hooks/useTheme';
import useHeaderContext from '@hooks/provider/Header/useHeaderContext';
import useRootDom from '@hooks/provider/RootDom/useRootDom';
import StateRender from '@utils/StateRender';
import HeaderMenuItem from './HeaderMenuItem';

export default function HeaderMenu() {
  const { getRoot } = useRootDom()

  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

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
          <HeaderMenuItem text="Theme">
            <Switch
              isSelected={theme === 'dark'}
              startContent={<MdLightMode />}
              endContent={<MdDarkMode />}
              onValueChange={toggleTheme}
            />
          </HeaderMenuItem>
        </PopoverContent>
      </Popover>,
      false: <Button isIconOnly radius='full' onClick={toggleTheme}>
        <StateRender
          state={theme}
          render={{
            'dark': <MdDarkMode />,
            'light': <MdLightMode />
          }}
        />
      </Button>
    }}
  />
}