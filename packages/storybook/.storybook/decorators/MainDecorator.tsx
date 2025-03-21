import React from 'react'
import i18n from '@fitness/web/src/i18n'
import { HeroUIProvider } from '@heroui/react'
import { I18nextProvider } from 'react-i18next'
import AllMockedProvider from '@fitness/web/src/service/GqlStore/AllMockedProvider'
import useApolloCache from '@fitness/web/src/hooks/apollo/useApolloCache'
import { StoryFn } from '@storybook/react'

type MainDecoratorStory = {
  loaders?: (() => Promise<any>)[];
} & StoryFn<any>;

const MainDecorator: MainDecoratorStory = (Story, { loaded: { apolloCache } }) => {
  return <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <HeroUIProvider>
        <AllMockedProvider cache={apolloCache}>
          <div className="dark bg-background text-default-700 storybook-root-path w-[640px]" style={{ padding: '2rem' }}>
            <Story />
          </div>
        </AllMockedProvider>
      </HeroUIProvider>
    </I18nextProvider>
  </React.StrictMode>
}

export const decorator = MainDecorator
export const loaders = [
  async () => ({
    apolloCache: await useApolloCache()
  })
]