import { HeroUIProvider, Spinner } from '@heroui/react'
import { Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertModal from '@globalUi/Alert'
import BottomNavi from '@globalUi/BottomNavi'
import FitnessDataModal from '@globalUi/FitnessDataModal'
import useTheme from '@shared/hooks/useTheme'
import CRouter from './CRoutes'
import DefaultLayout from './layout/DefaultLayout'

function App() {
  const navigate = useNavigate()
  useTheme(true)
  return <main className={'app h-screen max-h-full text-default-700'}>
    <HeroUIProvider navigate={navigate} className="app-root pb-12">
      <Suspense fallback={<div className="w-screen h-screen flex items-center justify-center"><Spinner /></div>}>
        <DefaultLayout>
          <CRouter></CRouter>
        </DefaultLayout>
      </Suspense>
      <BottomNavi />
      <AlertModal />
      <FitnessDataModal />
    </HeroUIProvider>
  </main>
}

export default App
