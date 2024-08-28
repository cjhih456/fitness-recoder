import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { AlertProvider } from './components/provider/Alert/AlertProvider.tsx'
import { HeaderProvider } from './components/provider/Header/HeaderProvider.tsx'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { link } from './HttpLink.ts'

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
  devtools: {
    enabled: true
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <ApolloProvider client={apolloClient}>
        <HeaderProvider>
          <AlertProvider>
            <App />
          </AlertProvider>
        </HeaderProvider>
      </ApolloProvider>
    </NextUIProvider>
  </React.StrictMode>,
)
