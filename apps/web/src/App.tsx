import { NextUIProvider, Spinner } from '@nextui-org/react'
import { Suspense, useMemo } from 'react'
import { I18nextProvider } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import useThema from '@hooks/provider/Thema/useThema'
import AlertProvider from '@provider/AlertProvider'
import BottomNaviProvider from '@provider/BottomNaviProvider'
import FitnessDataModalProvider from '@provider/FitnessDataModalProvider'
import CRouter from './CRoutes'
import i18n from './i18n'
import DefaultLayout from './layout/DefaultLayout'

function App() {
  const { getThema } = useThema()
  const navigate = useNavigate()
  const main = useMemo(() => <NextUIProvider navigate={navigate} className="app-root h-screen max-h-full flex flex-col">
    <I18nextProvider i18n={i18n}>
      <FitnessDataModalProvider>
        <AlertProvider>
          <DefaultLayout>
            <BottomNaviProvider>
              <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><Spinner /></div>}>
                <CRouter></CRouter>
              </Suspense>
            </BottomNaviProvider>
          </DefaultLayout>
        </AlertProvider>
      </FitnessDataModalProvider>
    </I18nextProvider>
  </NextUIProvider>, [navigate])
  return <div className={`app bg-background ${getThema()} h-screen max-h-full text-default-700`}>
    {main}
  </div>
}

export default App
