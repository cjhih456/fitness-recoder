import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const Main = lazy(() => import('./pages/Main'))
const CalenderPage = lazy(() => import('./pages/CalenderPage'))
const FitnessList = lazy(() => import('./pages/FitnessList'))
const CreateSchedule = lazy(() => import('./pages/:selectDate/schedule/create'))
const DisplaySchedule = lazy(() => import('./pages/:selectDate/schedule/:id'))
const DisplayWorkout = lazy(() => import('./pages/:selectDate/workout/:id'))
const PresetListPage = lazy(() => import('./pages/preset'))
const PresetDetailPage = lazy(() => import('./pages/preset/:id'))

export default function CRouter() {
  return <Routes>
    <Route index Component={Main} />
    <Route path="calender" Component={CalenderPage} />
    <Route path="fitnessList" Component={FitnessList} />
    <Route path=":selectDate/schedule/create" Component={CreateSchedule} />
    <Route path=":selectDate/schedule/:id" Component={DisplaySchedule} />
    <Route path=":selectDate/workout/:id" Component={DisplayWorkout} />
    <Route path="preset" Component={PresetListPage} />
    <Route path="preset/:id" Component={PresetDetailPage} />
  </Routes>
}