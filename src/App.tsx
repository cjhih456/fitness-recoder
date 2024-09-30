import { RouterProvider } from 'react-router-dom'
import useRouters from './Routes'
import { useThema } from './components/provider/ThemaProvider/useThema'

function App() {
  const routers = useRouters()
  const { getThema } = useThema()
  return <div className={`app bg-background ${getThema()} h-screen max-h-full text-default-700`}>
    <RouterProvider router={routers} />
  </div>
}

export default App
