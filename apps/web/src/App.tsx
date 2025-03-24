import { HeroUIProvider, Spinner } from '@heroui/react'
import { Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertModal } from '@provider/Alert/component/AlertModal'
import BottomNavi from '@ui/BottomNavi'
import FitnessDataModalProvider from '@ui/provider/FitnessDataModalProvider'
import CRouter from './CRoutes'
import DefaultLayout from './layout/DefaultLayout'

function App() {
  const navigate = useNavigate()
  return <main className={'app h-screen max-h-full text-default-700'}>
    <HeroUIProvider navigate={navigate} className="app-root pb-12">
      <FitnessDataModalProvider>
        <Suspense fallback={<div className="w-screen h-screen flex items-center justify-center"><Spinner /></div>}>
          <DefaultLayout>
            <CRouter></CRouter>
          </DefaultLayout>
        </Suspense>
      </FitnessDataModalProvider>
      <BottomNavi />
      <AlertModal />
    </HeroUIProvider>
  </main>
}

export default App
