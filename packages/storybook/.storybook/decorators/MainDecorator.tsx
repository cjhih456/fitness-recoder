import React, { Suspense } from 'react'
import i18n from '@fitness/web/src/i18n'
import { HeroUIProvider } from '@heroui/react'
import { I18nextProvider } from 'react-i18next'
import AllMockedProvider from '@fitness/web/src/service/GqlStore/AllMockedProvider'
import apolloCache from '@fitness/web/src/hooks/apollo/lib/apolloCache'
import { StoryFn } from '@storybook/react'

type MainDecoratorStory = StoryFn<any>;

const MainDecorator: MainDecoratorStory = (Story) => {
  return <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <HeroUIProvider>
        <AllMockedProvider cache={apolloCache}>
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