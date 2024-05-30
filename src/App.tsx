import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import FitnessList from './pages/FitnessList'
import CreateSchedule from './pages/:selectDate/schedule/create'
import DisplaySchedule from './pages/:selectDate/schedule/:id'
import DisplayWorkout from './pages/:selectDate/workout/:id'
import PresetListPage from './pages/preset'
import PresetDetailPage from './pages/preset/:id'
import { Link, Navbar, NavbarContent, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@nextui-org/react'
import { useState } from 'react'

interface Menu {
  name: string
  route: string
}

function App() {
  const [menuDisplay, setMenuDisplay] = useState(false)
  const [menuList] = useState<Menu[]>([{
    name: 'Home',
    route: '/',
  }, {
    name: 'Fitness',
    route: '/fitnessList'
  }, {
    name: 'Preset',
    route: '/preset'
  }])
  return <>
    <Navbar onMenuOpenChange={setMenuDisplay} maxWidth='sm'>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={menuDisplay ? 'Close menu' : 'Open menu'}
        ></NavbarMenuToggle>
      </NavbarContent>
      <NavbarMenu>
        {
          menuList.map(v => <NavbarMenuItem key={v.name}>
            <Link href={v.route}>{v.name}</Link>
          </NavbarMenuItem>)
        }
      </NavbarMenu>
    </Navbar>
    <main className="dark flex justify-center">
      <div className="max-w-[640px] w-[640px]">
        <Router>
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
  </>
}

export default App
