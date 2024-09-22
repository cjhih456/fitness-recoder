import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { NextUIProvider } from '@nextui-org/react'
import { AlertProvider } from './components/provider/Alert/AlertProvider.tsx'
import { HeaderProvider } from './components/provider/Header/HeaderProvider.tsx'
import ExerciseDataInfoModal from './components/provider/ExerciseDataModal/ExerciseDataInfoModal.tsx'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { link } from './HttpLink.ts'
import Worker from './worker.ts'
import Firebase from './service/firebase.ts'
const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
  devtools: {
    enabled: true
  }
})
Worker().then(() => {
  Firebase()
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <NextUIProvider>
        <ApolloProvider client={apolloClient}>
          <HeaderProvider>
            <ExerciseDataInfoModal>
              <AlertProvider>
                <App />
              </AlertProvider>
            </ExerciseDataInfoModal>
          </HeaderProvider>
        </ApolloProvider>
      </NextUIProvider>
    </React.StrictMode>,
  )
})
