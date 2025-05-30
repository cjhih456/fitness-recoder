import { Button, Popover, PopoverContent, PopoverTrigger, Switch } from '@heroui/react';
import { useState } from 'react';
import { MdDarkMode, MdLightMode, MdMoreVert } from 'react-icons/md';
import { useHeaderMenuValue } from '@shared/hooks/header';
import useTheme from '@shared/hooks/useTheme'
import { BooleanRender, EnumRender } from '@shared/ui/StateRender';
import HeaderMenuItem from './HeaderMenuItem';

export default function HeaderMenu() {

  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useTheme(true)

  const headerMenu = useHeaderMenuValue()

  return <BooleanRender
    state={Boolean(headerMenu.length)}
    render={{
      true: () => <Popover isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <PopoverTrigger>
          <Button isIconOnly variant='light' radius='full' >
            <MdMoreVert size="2rem" preserveAspectRatio="xMidYMid slice" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          {
            headerMenu.map((menu, idx) => {
              return <HeaderMenuItem key={`menu-${idx}`} text={menu.name} onClick={() => {
                menu.action()
                setIsOpen(false)
              }}></HeaderMenuItem>
            })
          }
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
      false: () => <Button isIconOnly radius='full' onPress={toggleTheme}>
        <EnumRender
          state={theme}
          render={{
            'dark': () => <MdDarkMode />,
            'light': () => <MdLightMode />
          }}
        />
      </Button>
    }}
  />
}