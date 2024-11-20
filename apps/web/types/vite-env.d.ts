/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_URL_ROOT: string
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv
}