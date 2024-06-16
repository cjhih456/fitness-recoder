/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_URL_ROOT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}