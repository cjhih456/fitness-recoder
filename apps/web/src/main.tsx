import { ApolloProvider } from '@apollo/client'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { useApollo } from '@hooks/apollo/useApollo'
import HeaderProvider from '@provider/Header/HeaderProvider'
import ThemeProvider from '@provider/Theme/ThemeProvider'
import Firebase from '@service/firebase'
import { baseURL } from '@utils'
import App from './App.tsx'
import Worker from './worker.ts'
Worker().then(async () => {
  const apolloClient = await useApollo()
  Firebase()
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <BrowserRouter basename={baseURL('/')}>
        <ThemeProvider>
          <HeaderProvider>
            <ApolloProvider client={apolloClient}>
              <App />
            </ApolloProvider>
          </HeaderProvider>
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>,
  )
})
