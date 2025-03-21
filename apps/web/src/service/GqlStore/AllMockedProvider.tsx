import type { InMemoryCache } from '@apollo/client';
import type { MockedResponse } from '@apollo/client/testing';
import type { ReactNode } from 'react';
import { MockedProvider } from '@apollo/client/testing';

const list = import.meta.glob(['../../hooks/apollo/**/*.ts'], { eager: true })

export default function AllMockedProvider({ children, cache }: { children: ReactNode, cache: InMemoryCache }) {
  const mocks: MockedResponse[] = []

  Object.entries(list).forEach(([key, value]) => {
    if (key.includes('index')) return
    const v = value as { [key: string]: any }
    Object.keys(v).forEach((k) => {
      if (k.endsWith('Mock')) {
        const temp = v[k] as MockedResponse
        temp.variableMatcher = temp.variableMatcher ?? (() => true)
        temp.maxUsageCount = Number.POSITIVE_INFINITY
        temp.request.query = cache.transformDocument(temp.request.query)
        mocks.push(temp)
      }
    })
  })
  return <MockedProvider showWarnings={false} mocks={mocks} cache={cache} connectToDevTools={true}>
    {children}
  </MockedProvider>
}