import type { Preview } from "@storybook/react";
import '../src/index.css';
import React from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { I18nextProvider } from 'react-i18next'
import AllMockedProvider from '../src/service/GqlStore/AllMockedProvider'
import { RootProvider } from '../src/components/provider/RootProvider/RootProvider'
import { withRouter } from 'storybook-addon-react-router-v6'
import i18n from '../src/i18n'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark'
    }
  },
  decorators: [
    withRouter,
    (Story) => {
      return <React.StrictMode>
        <I18nextProvider i18n={i18n}>
          <NextUIProvider>
            <RootProvider selector="div.storybook-root-path">
              <AllMockedProvider>
                <div className="dark bg-background text-default-700 storybook-root-path" style={{ padding: '2rem' }}>
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
