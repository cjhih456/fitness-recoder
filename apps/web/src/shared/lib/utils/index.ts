export { default as dayjs } from './dayjs'

export const enumify = <T extends { [index: string]: U }, U extends string>(x: T): T => x;

export function baseURL(url?: string) {
  return (import.meta.env.VITE_URL_ROOT + (url ?? '')).replace(/\/\//g, '/')
}

export default {
  enumify,
  baseURL
}