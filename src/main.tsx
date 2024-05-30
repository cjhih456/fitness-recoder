import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { AlertProvider } from './components/provider/Alert/AlertProvider.tsx'
import { HeaderProvider } from './components/provider/Header/HeaderProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <HeaderProvider>
        <AlertProvider>
          <App />
        </AlertProvider>
      </HeaderProvider>
    </NextUIProvider>
  </React.StrictMode>,
)
