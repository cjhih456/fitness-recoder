import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import FitnessList from './pages/FitnessList'

function App() {
  return <div className="dark flex justify-center">
    {/* <header></header> */}
    {/* <nav></nav> */}
    <main className=" w-[420px]">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/fitnessList' element={<FitnessList />} />
        </Routes>
      </Router>
    </main>
  </div>
}

export default App
