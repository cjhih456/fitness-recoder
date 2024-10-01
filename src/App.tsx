import { Route, Routes, useNavigate } from 'react-router-dom'
import { useThema } from './components/provider/ThemaProvider/useThema'
import { NextUIProvider } from '@nextui-org/react'
import ExerciseDataInfoModal from './components/provider/ExerciseDataModal/ExerciseDataInfoModal'
import { AlertProvider } from './components/provider/Alert/AlertProvider'
import DefaultLayout from './layout/DefaultLayout'
import { BottomNaviProvider } from './components/provider/BottomNavi/BottomNaviProvider'
import Main from './pages/Main'
import CalanderPage from './pages/CalanderPage'
import FitnessList from './pages/FitnessList'
import CreateSchedule from './pages/:selectDate/schedule/create'
import DisplaySchedule from './pages/:selectDate/schedule/:id'
import DisplayWorkout from './pages/:selectDate/workout/:id'
import PresetListPage from './pages/preset'
import PresetDetailPage from './pages/preset/:id'

function App() {
  const { getThema } = useThema()
  const navigate = useNavigate()
  return <div className={`app bg-background ${getThema()} h-screen max-h-full text-default-700`}>
    <NextUIProvider navigate={navigate} className="app-root h-screen max-h-full flex flex-col">
      <ExerciseDataInfoModal>
        <AlertProvider>
          <DefaultLayout>
            <BottomNaviProvider>
              <Routes>
                <Route index Component={Main} />
                <Route path="calander" Component={CalanderPage} />
                <Route path="fitnessList" Component={FitnessList} />
                <Route path=":selectDate">
                  <Route path="schedule">
                    <Route path="create" Component={CreateSchedule} />
                    <Route path=":id" Component={DisplaySchedule} />
                  </Route>
                </Route>
                <Route path="workout">
                  <Route path=":id" Component={DisplayWorkout} />
                </Route>
                <Route path="preset">
                  <Route index Component={PresetListPage} />
                  <Route path=":id" Component={PresetDetailPage} />
                </Route>
              </Routes>
            </BottomNaviProvider>
          </DefaultLayout>
        </AlertProvider>
      </ExerciseDataInfoModal>
    </NextUIProvider>
  </div>
}

export default App
