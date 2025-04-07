import type { InMemoryCache } from '@apollo/client';
import type { MockedResponse } from '@apollo/client/testing';
import type { ReactNode } from 'react';
import { MockedProvider } from '@apollo/client/testing';

export default function AllMockedProvider({ children, cache, mocks = [] }: { children: ReactNode, cache: InMemoryCache, mocks: MockedResponse[] }) {
  return <MockedProvider showWarnings={false} mocks={mocks} cache={cache}>
    {children}
  </MockedProvider>
}