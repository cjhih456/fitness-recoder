import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { HeaderProvider } from './components/provider/Header/HeaderProvider.tsx'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { link } from './HttpLink.ts'
import Worker from './worker.ts'
import Firebase from './service/firebase.ts'
import { ThemaProvider } from './components/provider/ThemaProvider/ThemaProvider.tsx'
import { RootProvider } from './components/provider/RootProvider/RootProvider.tsx'
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
      <ThemaProvider>
        <HeaderProvider>
          <RootProvider>
            <ApolloProvider client={apolloClient}>
              <App />
            </ApolloProvider>
          </RootProvider>
        </HeaderProvider>
      </ThemaProvider>
    </React.StrictMode>,
  )
})
