import type { Preview } from "@storybook/react";
import '../src/index.css';
import React from 'react'
import { NextUIProvider } from '@nextui-org/react'

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
    },
    actions: {
      argTypesRegex: '^(has|on).*'
    }
  },
  decorators: [
    (Story) => {
      return <React.StrictMode>
        <NextUIProvider>
          <Story />
        </NextUIProvider>
      </React.StrictMode>
    }
  ]
};

export default preview;
