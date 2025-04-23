# GraphQL Worker

GraphQL Worker는 웹 애플리케이션에서 사용되는 서비스 워커 기반의 GraphQL API 서버입니다.

## 기능

- Service Worker 환경에서 동작하는 Apollo Server
- SQLite Worker와의 통신을 통한 데이터 관리
- 실시간 데이터 동기화 지원
- 오프라인 상태에서의 데이터 처리

## 아키텍처

```
GraphQL Worker
├── Apollo Server (Service Worker)
├── SQLite Worker 통신 레이어
└── 데이터 캐싱 및 동기화
```

## API 구조

GraphQL Worker는 다음과 같은 주요 타입들을 제공합니다:

- Schedule
- ExercisePreset
- Exercise
- Fitness
- Set

## 사용 방법

1. 워커 등록:
```typescript
// worker.ts
import graphqlWorkerUrl from '@fitness/graphql-worker?worker&url'
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(graphqlWorkerUrl, { type: 'module', updateViaCache: 'imports', scope: baseURL('/') })
}
```

2. Apollo Client 설정:
```typescript
import { ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client';
const httpLink = createHttpLink({
  uri: baseURL('/db')
})
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});
```

## 의존성

- @apollo/server
- packages/sqlite-worker
- packages/sqlite-message-types
- packages/struct
