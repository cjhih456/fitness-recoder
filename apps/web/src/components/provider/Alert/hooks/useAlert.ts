import type { AlertData } from '../atom';
import { useAtom } from 'jotai'
import { alertAtom } from '../atom'

export default function useAlert() {
  const [alertList, setAlertList] = useAtom(alertAtom)
  return {
    alertList,
    setAlertList,
    pushAlert: (alert: Omit<AlertData, 'resolver'>) => {
      const tempObj = {
        ...alert,
        resolver: undefined
      } as AlertData
      const promiser = new Promise<boolean>((resolve) => {
        tempObj.resolver = resolve
      })
      setAlertList((prev) => [...prev, tempObj])
      return promiser
    }
  }
}