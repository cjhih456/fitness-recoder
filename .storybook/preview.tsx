import type { Preview } from "@storybook/react";
import '../src/index.css';
import React from 'react'
import { NextUIProvider } from '@nextui-org/react'
import AllMockedProvider from '../src/service/GqlStore/AllMockedProvider'
import { RootProvider } from '../src/components/provider/RootProvider/RootProvider'


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
    (Story) => {
      return <React.StrictMode>
        <NextUIProvider>
          <RootProvider selector="div.storybook-root-path">
            <AllMockedProvider>
              <div className="dark bg-background text-default-700 storybook-root-path" style={{ padding: '2rem' }}>
                <Story />
              </div>
            </AllMockedProvider>
          </RootProvider>
        </NextUIProvider>
      </React.StrictMode>
    }
  ]
};

export default preview;
