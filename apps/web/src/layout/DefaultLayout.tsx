import type { ReactNode } from 'react';
import { Button, Link, Navbar, NavbarContent, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@nextui-org/react'
import { useCallback, useMemo, useState } from 'react'
import { MdArrowBackIosNew, MdClose, MdMenu } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'
import HeaderContent from '@components/Header/HeaderContent'
import HeaderMenu from '@components/Header/HeaderMenu'
import useRootDom from '@hooks/provider/RootDom/useRootDom';

interface DefaultLayoutProps {
  children: ReactNode
}

interface Menu {
  name: string
  route: string
}

export default function DefaultLayout({
  children
}: DefaultLayoutProps) {
  const navigate = useNavigate()
  const [menuDisplay, setMenuDisplay] = useState(false)
  const [menuList] = useState<Menu[]>([{
    name: 'Home',
    route: '/',
  }, {
    name: 'Calander',
    route: '/calander',
  }, {
    name: 'Fitness',
    route: '/fitnessList'
  }, {
    name: 'Preset',
    route: '/preset'
  }])
  const { getRoot } = useRootDom()
  const location = useLocation()
  const fallback = useCallback(() => {
    navigate(-1)
  }, [navigate])
  const menuBtn = useMemo(() => {
    if (location.pathname.split('/').length > 2) {
      return <Button isIconOnly variant='light' size='sm' onClick={fallback} >
        <MdArrowBackIosNew size="1.5rem" preserveAspectRatio="xMidYMid slice" />
      </Button>
    } else {
      return <NavbarMenuToggle
        className="w-unit-10"
        icon={(isOpen: boolean) => {
          return isOpen ? <MdClose size="2rem" preserveAspectRatio="xMidYMid slice" /> : <MdMenu size="2rem" preserveAspectRatio="xMidYMid slice" />
        }}
      ></NavbarMenuToggle>
    }
  }, [location.pathname, fallback])
  const child = useMemo(() => children, [children])

  return <>
    <Navbar onMenuOpenChange={setMenuDisplay} isMenuOpen={menuDisplay} maxWidth='sm'>
      <NavbarContent justify='start'>
        {menuBtn}
      </NavbarContent>
      <NavbarContent justify="center">
        <HeaderContent />
      </NavbarContent>
      <NavbarContent justify="end">
        <HeaderMenu />
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