import { HeroUIProvider, Spinner } from '@heroui/react'
import { Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import FitnessDataModal from '@globalUi/FitnessDataModal'
import BottomNavi from '@shared/hooks/bottomNavi'
import useTheme from '@shared/hooks/useTheme'
import AlertModal from '@shared/ui/Alert'
import DefaultLayout from './layout/DefaultLayout'
import CRouter from './routes/CRoutes'

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
