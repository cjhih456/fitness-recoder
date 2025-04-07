import { ApolloProvider } from '@apollo/client'
import { Spinner } from '@heroui/react'
import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'
import apolloClient from '@hooks/apollo/lib/apolloClient.ts'
import firebase from '@service/firebase'
import i18n from '@shared/config/i18n/index.ts'
import { baseURL } from '@shared/lib/utils/index.ts'
import App from './App.tsx'
import Worker from './worker.ts'

firebase()
Worker().then(() => {
  createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        <ApolloProvider client={apolloClient}>
          <BrowserRouter basename={baseURL('/')}>
            <Suspense fallback={<div className="w-screen h-screen flex items-center justify-center"><Spinner /></div>}>
              <App />
            </Suspense>
          </BrowserRouter>
        </ApolloProvider>
      </I18nextProvider>
    </React.StrictMode>,
  )
})
