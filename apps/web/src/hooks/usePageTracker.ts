import { useEffect } from 'react';
import { LogEvent } from '../service/firebase';

export default function usePageTracker(name: string) {
  useEffect(() => {
    LogEvent(`visit_${name}`)
    return () => {
      LogEvent(`exit_${name}`)
    }
  }, [])
}