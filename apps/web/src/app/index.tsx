import { ApolloProvider } from '@apollo/client'
import { Spinner } from '@heroui/react'
import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'
import i18n from '@shared/config/i18n/index.ts'
import getApolloClient from '@shared/lib/apollo'
import firebase from '@shared/lib/firebase/firebase.ts'
import { baseURL } from '@shared/lib/utils/index.ts'
import App from './App.tsx'
import { getFragmentFiles } from './lib/getFragmentFiles.ts'
import Worker from './worker.ts'

firebase()

const fragmentList = getFragmentFiles()
const client = getApolloClient({ fragmentList })

Worker().then(() => {
  createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        <ApolloProvider client={client}>
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
