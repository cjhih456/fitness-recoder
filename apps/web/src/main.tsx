import { ApolloProvider } from '@apollo/client'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ThemeProvider from '@components/Theme/ThemeProvider/index.ts'
import { useApollo } from '@hooks/apollo/useApollo'
import HeaderProvider from '@provider/HeaderProvider'
import RootProvider from '@provider/RootDomProvider'
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
            <RootProvider>
              <ApolloProvider client={apolloClient}>
                <App />
              </ApolloProvider>
            </RootProvider>
          </HeaderProvider>
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>,
  )
})
