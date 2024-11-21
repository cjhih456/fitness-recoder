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
1. [vite-plugin-i18next-language-pack-loader](#language-pack-loader)
1. [@fitness/storybook](#storybook)

### commands

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
# or
sudo yarn dev
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

### <a id="language-pack-loader"></a> vite-plugin-i18next-language-pack-loader
Vite plugin for loading language packs with i18next.

### <a id="storybook"></a> @fitness/storybook