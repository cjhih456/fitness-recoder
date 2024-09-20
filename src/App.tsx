import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import FitnessList from './pages/FitnessList'
import CreateSchedule from './pages/:selectDate/schedule/create'
import DisplaySchedule from './pages/:selectDate/schedule/:id'
import DisplayWorkout from './pages/:selectDate/workout/:id'
import PresetListPage from './pages/preset'
import PresetDetailPage from './pages/preset/:id'
import { Button, Link, Navbar, NavbarContent, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@nextui-org/react'
import { baseURL } from './components/utils'
import { useMemo, useState } from 'react'
import { useHeaderContext } from './components/provider/Header/useHeaderContext'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

interface Menu {
  name: string
  route: string
}

function App() {
  const [menuDisplay, setMenuDisplay] = useState(false)
  const [isDarkMode, setDarkMode] = useState(false)
  const [menuList] = useState<Menu[]>([{
    name: 'Home',
    route: baseURL('/'),
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
  return <div className={`flex flex-col h-screen bg-background ${isDarkMode ? 'dark' : 'light'}`}>
    <Navbar onMenuOpenChange={setMenuDisplay} isMenuOpen={menuDisplay} maxWidth='sm'>
      <NavbarContent justify='start'>
        <NavbarMenuToggle
          className='font-black text-default-700'
          aria-label={menuDisplay ? 'Close menu' : 'Open menu'}
        ></NavbarMenuToggle>
      </NavbarContent>
      <NavbarContent justify="center" className="text-default-700">
        {headerContent}
      </NavbarContent>
      <NavbarContent justify="end">
        <Button isIconOnly radius='full' onClick={() => {
          setDarkMode(!isDarkMode)
        }}>
          {isDarkMode ? <MdDarkMode></MdDarkMode> : <MdLightMode></MdLightMode>}
        </Button>
      </NavbarContent>
      <NavbarMenu>
        {
          menuList.map(v => <NavbarMenuItem key={v.name}>
            <Link href={v.route}>{v.name}</Link>
          </NavbarMenuItem>)
        }
      </NavbarMenu>
    </Navbar>
    <main className="flex flex-1 justify-center">
      <div className="max-w-[640px] w-[640px] relative">
        <Router basename={baseURL()}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/fitnessList' element={<FitnessList />} />
            <Route path="/:selectDate">
              <Route path='schedule'>
                <Route path='create' element={<CreateSchedule />} />
                <Route path=':id' element={<DisplaySchedule />} />
              </Route>
              <Route path='workout'>
                <Route path=":id" element={<DisplayWorkout />}></Route>
              </Route>
            </Route>
            <Route path='/preset'>
              <Route index element={<PresetListPage />}></Route>
              <Route path=":id" element={<PresetDetailPage />}></Route>
            </Route>
          </Routes>
        </Router>
      </div>
    </main>
  </div>
}

export default App
