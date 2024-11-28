declare namespace React {
  interface IframeHTMLAttributes<T> extends React.HTMLAttributes<T> {
    credentialless?: 'true'
  }
  interface CSSProperties {
    [key: `--${string}`]: string | number
  }
}