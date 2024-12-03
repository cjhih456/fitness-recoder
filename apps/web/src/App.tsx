import { useNavigate } from 'react-router-dom'
import { useThema } from './components/provider/ThemaProvider/useThema'
import { NextUIProvider, Spinner } from '@nextui-org/react'
import ExerciseDataInfoModal from './components/provider/ExerciseDataModal/ExerciseDataInfoModal'
import { AlertProvider } from './components/provider/Alert/AlertProvider'
import DefaultLayout from './layout/DefaultLayout'
import { BottomNaviProvider } from './components/provider/BottomNavi/BottomNaviProvider'
import { Suspense, useMemo } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import CRouter from './CRoutes'


function App() {
  const { getThema } = useThema()
  const navigate = useNavigate()
  const main = useMemo(() => <NextUIProvider navigate={navigate} className="app-root h-screen max-h-full flex flex-col">
    <I18nextProvider i18n={i18n}>
      <ExerciseDataInfoModal>
        <AlertProvider>
          <DefaultLayout>
            <BottomNaviProvider>
              <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><Spinner /></div>}>
                <CRouter></CRouter>
              </Suspense>
            </BottomNaviProvider>
          </DefaultLayout>
        </AlertProvider>
      </ExerciseDataInfoModal>
    </I18nextProvider>
  </NextUIProvider>, [navigate])
  return <div className={`app bg-background ${getThema()} h-screen max-h-full text-default-700`}>
    {main}
  </div>
}

export default App
