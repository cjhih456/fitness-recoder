import { HeroUIProvider, Spinner } from '@heroui/react'
import { Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertProvider from '@provider/Alert/AlertProvider'
import BottomNaviProvider from '@provider/BottomNavi/BottomNaviProvider'
import HeaderProvider from '@provider/Header/HeaderProvider'
import FitnessDataModalProvider from '@ui/provider/FitnessDataModalProvider'
import CRouter from './CRoutes'
import DefaultLayout from './layout/DefaultLayout'

function App() {
  const navigate = useNavigate()
  return <div className={'app h-screen max-h-full text-default-700'}>
    <HeroUIProvider navigate={navigate} className="app-root pb-12">
      <HeaderProvider>
        <BottomNaviProvider>
          <FitnessDataModalProvider>
            <AlertProvider>
              <Suspense fallback={<div className="w-screen h-screen flex items-center justify-center"><Spinner /></div>}>
                <DefaultLayout>
                  <CRouter></CRouter>
                </DefaultLayout>
              </Suspense>
            </AlertProvider>
          </FitnessDataModalProvider>
        </BottomNaviProvider>
      </HeaderProvider>
    </HeroUIProvider>
  </div>
}

export default App
