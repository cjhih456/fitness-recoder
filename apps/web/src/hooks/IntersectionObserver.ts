import { useRef } from 'react';

export default function useIntersectionObserver(callback: () => void): [(_t: Element) => void, () => void] {
  const observer = useRef(
    new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      },
      {
        threshold: 1,
      }
    )
  );
  function observe(t: Element) { observer.current.observe(t) }
  function disconnect() { observer.current.disconnect() }
  return [observe, disconnect]
}