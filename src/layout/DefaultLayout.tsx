import { useMemo, useState } from 'react'
import { baseURL } from '../components/utils'
import { Button, Link, Navbar, NavbarContent, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@nextui-org/react'
import { MdClose, MdDarkMode, MdLightMode, MdMenu } from 'react-icons/md'
import { useHeaderContext } from '../components/provider/Header/useHeaderContext'
import { useThema } from '../components/provider/ThemaProvider/useThema'
import { useRoot } from '../components/provider/RootProvider/useRoot'

interface DefaultLayoutProps {
  children: React.ReactNode
}

interface Menu {
  name: string
  route: string
}

export default function DefaultLayout({
  children
}: DefaultLayoutProps) {
  const { setThema, getThema } = useThema()
  const headerContext = useHeaderContext()
  const headerContent = useMemo(() => {
    return headerContext.getHeaderContent()
  }, [headerContext])
  const [menuDisplay, setMenuDisplay] = useState(false)
  const [menuList] = useState<Menu[]>([{
    name: 'Home',
    route: baseURL('/'),
  }, {
    name: 'Calander',
    route: baseURL('/calander'),
  }, {
    name: 'Fitness',
    route: baseURL('/fitnessList')
  }, {
    name: 'Preset',
    route: baseURL('/preset')
  }])
  const { getRoot } = useRoot()
  const child = useMemo(() => children, [children])

  return <>
    <Navbar onMenuOpenChange={setMenuDisplay} isMenuOpen={menuDisplay} maxWidth='sm'>
      <NavbarContent justify='start'>
        <NavbarMenuToggle
          className="w-unit-10"
          icon={(isOpen: boolean) => {
            return isOpen ? <MdClose size="2.5rem" preserveAspectRatio="xMidYMid slice" /> : <MdMenu size="2.5rem" preserveAspectRatio="xMidYMid slice" />
          }}
        ></NavbarMenuToggle>
      </NavbarContent>
      <NavbarContent justify="center">
        {headerContent}
      </NavbarContent>
      <NavbarContent justify="end">
        <Button isIconOnly radius='full' onClick={() => {
          setThema(getThema() === 'dark' ? 'light' : 'dark')
        }}>
          {getThema() === 'dark' ? <MdDarkMode /> : <MdLightMode />}
        </Button>
      </NavbarContent>
      <NavbarMenu portalContainer={getRoot()}>
        {
          menuList.map(v => <NavbarMenuItem key={v.name}>
            <Link href={v.route} onClick={() => { setMenuDisplay(false) }}>{v.name}</Link>
          </NavbarMenuItem>)
        }
      </NavbarMenu>
    </Navbar>
    <main className="flex flex-1 justify-center max-h-[calc(100%-4rem)] overflow-hidden">
      <div className="max-w-[640px] w-[640px] relative">
        {child}
      </div>
    </main>
  </>
}