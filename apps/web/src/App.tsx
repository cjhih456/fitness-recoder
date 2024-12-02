import { Route, Routes, useNavigate } from 'react-router-dom'
import { useThema } from './components/provider/ThemaProvider/useThema'
import { NextUIProvider, Spinner } from '@nextui-org/react'
import ExerciseDataInfoModal from './components/provider/ExerciseDataModal/ExerciseDataInfoModal'
import { AlertProvider } from './components/provider/Alert/AlertProvider'
import DefaultLayout from './layout/DefaultLayout'
import { BottomNaviProvider } from './components/provider/BottomNavi/BottomNaviProvider'
import { lazy, Suspense, useMemo } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'

const Main = lazy(() => import('./pages/Main'))
const CalanderPage = lazy(() => import('./pages/CalanderPage'))
const FitnessList = lazy(() => import('./pages/FitnessList'))
const CreateSchedule = lazy(() => import('./pages/:selectDate/schedule/create'))
const DisplaySchedule = lazy(() => import('./pages/:selectDate/schedule/:id'))
const DisplayWorkout = lazy(() => import('./pages/:selectDate/workout/:id'))
const PresetListPage = lazy(() => import('./pages/preset'))
const PresetDetailPage = lazy(() => import('./pages/preset/:id'))

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
                <Routes>
                  <Route index Component={Main} />
                  <Route path="calander" Component={CalanderPage} />
                  <Route path="fitnessList" Component={FitnessList} />
                  <Route path=":selectDate/schedule/create" Component={CreateSchedule} />
                  <Route path=":selectDate/schedule/:id" Component={DisplaySchedule} />
                  <Route path=":selectDate/workout/:id" Component={DisplayWorkout} />
                  <Route path="preset" Component={PresetListPage} />
                  <Route path="preset/:id" Component={PresetDetailPage} />
                </Routes>
              </Suspense>
            </BottomNaviProvider>
          </DefaultLayout>
        </AlertProvider>
      </ExerciseDataInfoModal>
    </I18nextProvider>
  </NextUIProvider>, [])
  return <div className={`app bg-background ${getThema()} h-screen max-h-full text-default-700`}>
    {main}
  </div>
}

export default App
