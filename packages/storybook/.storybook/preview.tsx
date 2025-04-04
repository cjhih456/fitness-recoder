import type { Preview } from "@storybook/react";
import './index.css';

import { withRouter } from 'storybook-addon-remix-react-router'
import { decorator as MainDecorator } from "./decorators/MainDecorator";


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
    MainDecorator
  ]
};

export default preview;
