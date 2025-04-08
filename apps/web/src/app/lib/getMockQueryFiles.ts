import type { InMemoryCache } from '@apollo/client'
import type { MockedResponse } from '@apollo/client/testing'

export const getMockQueryFiles = (cache: InMemoryCache) => {
  const list = import.meta.glob(['../../entities/**/*.mock.ts'], { eager: true, import: 'default' })
  return Object.keys(list).map((key) => {
    const mockResponse = list[key] as MockedResponse
    mockResponse.variableMatcher = mockResponse.variableMatcher ?? (() => true)
    mockResponse.maxUsageCount = Number.POSITIVE_INFINITY
    mockResponse.request.query = cache.transformDocument(mockResponse.request.query)
    return mockResponse
  })
}
