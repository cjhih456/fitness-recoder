# Fitness Recoder

## Packages
### Main App
1. [@fitness/web](#web)

### Sub repo
1. [@types/fitness-struct](#struct)
1. [@types/sqlite-message-types](#sqlite-message-types)
1. [@fitness/eslint-config](#eslint-config)
1. [@fitness/sqlite-worker](#sqlite-worker)
1. [@fitness/graphql-worker](#graphql-worker)
1. [@fitness/storybook](#storybook)
1. [@fitness/vite-plugin-graphql-server](#graphql-server)
1. [vite-plugin-i18next-language-pack-loader](#language-pack-loader)

### Used Tech
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
  - ![TypeScript Badge](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=for-the-badge)
  - ![ESLint Badge](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=fff&style=for-the-badge)
  - ![rollup.js Badge](https://img.shields.io/badge/rollup.js-EC4A3F?logo=rollupdotjs&logoColor=fff&style=for-the-badge)
  - ![Storybook Badge](https://img.shields.io/badge/Storybook-FF4785?logo=storybook&logoColor=fff&style=for-the-badge)
  - ![SQLite Badge](https://img.shields.io/badge/SQLite-003B57?logo=sqlite&logoColor=fff&style=flat)
  - ![GraphQL Badge](https://img.shields.io/badge/GraphQL-E10098?logo=graphql&logoColor=fff&style=flat)
  - ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
    - ![Apollo-GraphQL](https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql)
    - ![NextUI Badge](https://img.shields.io/badge/NextUI-000?logo=nextui&logoColor=fff&style=flat)
    - ![i18next Badge](https://img.shields.io/badge/i18next-26A69A?logo=i18next&logoColor=fff&style=flat)
    - ![Tailwind CSS Badge](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=fff&style=flat)

#### Install packages
```sh
yarn install
```

#### Build Process
```sh
yarn build
```

#### Dev Process
```sh
yarn dev
```

#### Check Eslint
```sh
yarn lint
```

### define ENV
This project are used global .env configurations.
Please config env on `./.env.development` and `./.env.production`.

## Descriptions

### <a id="web"></a> @fitness/web
Fitness recording service. This project will use Sqlite, GraphqlServer on Web Worker and Service Worker.


### <a id="struct"></a> @types/fitness-struct
Typescript global object structures. 
This package will be give effect on [@fitness/web](#web), [@fitness/graphql-worker](#graphql-worker).

### <a id="sqlite-message-types"></a> @types/sqlite-message-types
Typescript objects of sqlite transition.

### <a id="eslint-config"></a> @fitness/eslint-config
Global eslint configurations have. 

### <a id="sqlite-worker"></a> @fitness/sqlite-worker
Web Worker package, will launch sqlite on worker thread. 
This package will be used in [@fitness/web](apps/web/src/worker.ts).

### <a id="graphql-worker"></a> @fitness/graphql-worker
Service worker package, will launch graphql on service worker. 
This package will be used in [@fitness/web](apps/web/src/worker.ts).

### <a id="graphql-server"></a> @fitness/vite-plugin-graphql-server
Vite plugin for Graphql Server & Graphql Possible type.

### <a id="language-pack-loader"></a> vite-plugin-i18next-language-pack-loader
Vite plugin for loading language packs with i18next.

### <a id="storybook"></a> @fitness/storybook