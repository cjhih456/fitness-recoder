import type { MockedResponse } from '@apollo/client/testing';
import type { ReactNode } from 'react';
import { MockedProvider } from '@apollo/client/testing';
import useApolloCache from '@hooks/apollo/useApolloCache';

const list = import.meta.glob('./**/*.ts')
const mocks: MockedResponse[] = []
Object.entries(list).forEach(async ([key, value]) => {
  if (key.includes('index')) return
  const v = await value() as { [key: string]: any }
  Object.keys(v).forEach(k => {
    if (k.endsWith('Mock')) {
      mocks.push(v[k] as MockedResponse)
    }
  })
})

export default function AllMockedProvider({ children }: { children: ReactNode }) {
  const cache = useApolloCache()
  const tempMocks = mocks.map(v => {
    v.variableMatcher = v.variableMatcher ? v.variableMatcher : () => true
    return v
  })
  return <MockedProvider mocks={tempMocks} addTypename cache={cache}>
    {children}
  </MockedProvider>
}