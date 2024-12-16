import type { Preview } from "@storybook/react";
import './index.css';
import React from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { I18nextProvider } from 'react-i18next'
import AllMockedProvider from '@fitness/web/src/service/GqlStore/AllMockedProvider'
import RootProvider from '@fitness/web/src/components/provider/RootDomProvider'
import useApolloCache from '@fitness/web/src/hooks/apollo/useApolloCache'

import { withRouter } from 'storybook-addon-remix-react-router'
import i18n from '@fitness/web/src/i18n'


const apolloCache = await useApolloCache()

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    globals: {
      theme: 'dark'
    },
  },
  decorators: [
    withRouter,
    (Story) => {
      return <React.StrictMode>
        <I18nextProvider i18n={i18n}>
          <NextUIProvider>
            <RootProvider selector="div.storybook-root-path">
              <AllMockedProvider cache={apolloCache}>
                <div className="dark bg-background text-default-700 storybook-root-path w-[640px]" style={{ padding: '2rem' }}>
                  <Story />
                </div>
              </AllMockedProvider>
            </RootProvider>
          </NextUIProvider>
        </I18nextProvider>
      </React.StrictMode>
    }
  ]
};

export default preview;
