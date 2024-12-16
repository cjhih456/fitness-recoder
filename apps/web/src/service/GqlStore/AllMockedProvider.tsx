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
    Object.keys(v).forEach(k => {
      if (k.endsWith('Mock')) {
        mocks.push(v[k] as MockedResponse)
      }
    })
  })
  const tempMocks = mocks.map(v => {
    v.variableMatcher = v.variableMatcher ? v.variableMatcher : () => true
    return v
  })
  return cache ? <MockedProvider mocks={tempMocks} cache={cache}>
    {children}
  </MockedProvider> : <></>
}