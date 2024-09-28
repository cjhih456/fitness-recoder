import { RouterProvider } from 'react-router-dom'
import { Button, Link, Navbar, NavbarContent, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@nextui-org/react'
import { baseURL } from './components/utils'
import { useEffect, useMemo, useState } from 'react'
import { useHeaderContext } from './components/provider/Header/useHeaderContext'
import { MdClose, MdDarkMode, MdLightMode, MdMenu } from 'react-icons/md'
import useRouters from './Routes'

interface Menu {
  name: string
  route: string
}

function App() {
  const routers = useRouters()
  const [menuDisplay, setMenuDisplay] = useState(false)
  const [isDarkMode, setDarkMode] = useState(true)
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
  const headerContext = useHeaderContext()
  const headerContent = useMemo(() => {
    return headerContext.getHeaderContent()
  }, [headerContext])
  const [rootDocument, setRootDocument] = useState<Element | undefined>()
  useEffect(() => {
    setRootDocument(document.querySelector('#root > div > div.app') || document.body)
  }, [])
  return <div className={`app flex flex-col h-screen bg-background ${isDarkMode ? 'dark' : 'light'} max-h-full text-default-700`}>
    <Navbar onMenuOpenChange={setMenuDisplay} isMenuOpen={menuDisplay} maxWidth='sm'>
      <NavbarContent justify='start'>
        <NavbarMenuToggle
          className="w-unit-10"
          icon={(isOpen: boolean) => {
            return isOpen ? <MdClose size="2.5rem" preserveAspectRatio="xMidYMid slice"></MdClose> : <MdMenu size="2.5rem" preserveAspectRatio="xMidYMid slice"></MdMenu>
          }}
        ></NavbarMenuToggle>
      </NavbarContent>
      <NavbarContent justify="center">
        {headerContent}
      </NavbarContent>
      <NavbarContent justify="end">
        <Button isIconOnly radius='full' onClick={() => {
          setDarkMode(!isDarkMode)
        }}>
          {isDarkMode ? <MdDarkMode></MdDarkMode> : <MdLightMode></MdLightMode>}
        </Button>
      </NavbarContent>
      <NavbarMenu portalContainer={rootDocument}>
        {
          menuList.map(v => <NavbarMenuItem key={v.name}>
            <Link href={v.route}>{v.name}</Link>
          </NavbarMenuItem>)
        }
      </NavbarMenu>
    </Navbar>
    <main className="flex flex-1 justify-center max-h-[calc(100%-4rem)] overflow-hidden">
      <div className="max-w-[640px] w-[640px] relative">
        <RouterProvider router={routers} />
      </div>
    </main>
  </div>
}

export default App
