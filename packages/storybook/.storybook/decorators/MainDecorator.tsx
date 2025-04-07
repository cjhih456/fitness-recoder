import React, { Suspense } from 'react'
import i18n from '@fitness/web/src/shared/config/i18n'
import { HeroUIProvider } from '@heroui/react'
import { I18nextProvider } from 'react-i18next'
import AllMockedProvider from '@fitness/web/src/shared/test/AllMockedProvider'
import getApolloCache from '@fitness/web/src/shared/lib/apollo/apolloCache'
import { StoryFn } from '@storybook/react'
import { getFragmentFiles } from '@fitness/web/src/app/lib/getFragmentFiles'

type MainDecoratorStory = StoryFn<any>;

const fragmentList = getFragmentFiles()
const cache = getApolloCache({ fragmentList })

const MainDecorator: MainDecoratorStory = (Story) => {
  return <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <HeroUIProvider>
        <AllMockedProvider cache={cache}>
          <div className="dark bg-background text-default-700 storybook-root-path w-[640px]" style={{ padding: '2rem' }}>
            <Suspense>
              <Story />
            </Suspense>
          </div>
        </AllMockedProvider>
      </HeroUIProvider>
    </I18nextProvider>
  </React.StrictMode>
}

export const decorator = MainDecorator