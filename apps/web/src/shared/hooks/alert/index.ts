import type { AlertData } from '../../lib/store/alert';
import { useAtomValue, useSetAtom } from 'jotai'
import { alertAtom } from '../../lib/store/alert'

export const useAlertState = () => {
  return useAtomValue(alertAtom)
}

export const useSetAlert = () => {
  const setAlertList = useSetAtom(alertAtom)
  return {
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

export default function useAlert() {
  const alertList = useAlertState()
  const alertActions = useSetAlert()
  return {
    alertList,
    ...alertActions
  }
}