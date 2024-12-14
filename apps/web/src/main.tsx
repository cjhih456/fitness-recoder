import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import HeaderProvider from '@provider/HeaderProvider'
import { ApolloProvider } from '@apollo/client'
import Worker from './worker.ts'
import Firebase from '@service/firebase'
import ThemaProvider from '@provider/ThemaProvider'
import RootProvider from '@provider/RootDomProvider'
import { BrowserRouter } from 'react-router-dom'
import { baseURL } from './components/utils'
import { useApollo } from '@hooks/apollo/useApollo'
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
