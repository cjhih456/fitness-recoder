import type { Dispatch, SetStateAction } from 'react';
import { useMemo, useState } from 'react'

export default function useIdToggle(): [number[], Dispatch<SetStateAction<Set<number>>>, (_id: number) => void] {
  // Selected
  const [idList, setIdList] = useState(new Set<number>())
  const exportList = useMemo(() => Array.from(idList), [idList])
  /**
   * Toggle value on Set container
   * @param prevSet prev Set datas
   * @param id toggle target fitness Data
   * @returns new Set
   */
  function toggleIdOnSet(prevSet: Set<number>, id: number) {
    const newSet = new Set(prevSet)
    newSet.has(id) ? newSet.delete(id) : newSet.add(id)
    return newSet
  }
  function toggleId(id: number) {
    setIdList((prev) => toggleIdOnSet(prev, id))
  }
  return [exportList, setIdList, toggleId]
}