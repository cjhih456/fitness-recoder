import { NextUIProvider, Spinner } from '@nextui-org/react'
import { Suspense, useMemo } from 'react'
import { I18nextProvider } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import AlertProvider from '@provider/Alert/AlertProvider'
import BottomNaviProvider from '@provider/BottomNavi/BottomNaviProvider'
import FitnessDataModalProvider from '@ui/provider/FitnessDataModalProvider'
import CRouter from './CRoutes'
import i18n from './i18n'
import DefaultLayout from './layout/DefaultLayout'

function App() {
  const navigate = useNavigate()
  const main = useMemo(() => <NextUIProvider navigate={navigate} className="app-root pb-12">
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
  return <div className={'app h-screen max-h-full text-default-700'}>
    {main}
  </div>
}

export default App
