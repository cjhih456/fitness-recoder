declare namespace React {
  interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
    credentialless?: 'true'
  }
}