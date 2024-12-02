import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { HeaderProvider } from './components/provider/Header/HeaderProvider.tsx'
import { ApolloProvider } from '@apollo/client'
import Worker from './worker.ts'
import Firebase from './service/firebase.ts'
import { ThemaProvider } from './components/provider/ThemaProvider/ThemaProvider.tsx'
import { RootProvider } from './components/provider/RootProvider/RootProvider.tsx'
import { BrowserRouter } from 'react-router-dom'
import { baseURL } from './components/utils.ts'
import { useApollo } from './hooks/apollo/useApollo.ts'
Worker().then(async () => {
  const apolloClient = await useApollo()
  Firebase()
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <BrowserRouter basename={baseURL('/')}>
        <ThemaProvider>
          <HeaderProvider>
            <RootProvider>
              <ApolloProvider client={apolloClient}>
                <App />
              </ApolloProvider>
            </RootProvider>
          </HeaderProvider>
        </ThemaProvider>
      </BrowserRouter>
    </React.StrictMode>,
  )
})
