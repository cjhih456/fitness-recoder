import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import FitnessList from './pages/FitnessList'
import CreateSchedule from './pages/:selectDate/schedule/create'
import DisplaySchedule from './pages/:selectDate/schedule/:id'

function App() {
  return <div className="dark flex justify-center">
    <main className="w-[420px]">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/fitnessList' element={<FitnessList />} />
          <Route path="/:selectDate">
            <Route path='schedule'>
              <Route path='create' element={<CreateSchedule />} />
              <Route path=':id' element={<DisplaySchedule />} />
            </Route>
            <Route path='workout'>
              <Route path=":id"></Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </main>
  </div>
}

export default App
