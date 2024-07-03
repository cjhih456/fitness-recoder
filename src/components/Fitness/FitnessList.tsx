import { Spinner } from '@nextui-org/react';
import FitnessItem from './FitnessItem';
import { useEffect, useMemo, useState } from 'react';
import useIntersectionObserver from '../../hooks/IntersectionObserver';

export type FitnessListSelectedProps = { selected: boolean, idx: number }
export interface FitnessListProps {
  list: number[]
  selectedList?: number[]
  changeSelectedList?: (selectedList: number[]) => void
}

export default function FitnessList({ list, selectedList, changeSelectedList }: FitnessListProps) {
  const [page, changePage] = useState(1)
  const [observe, disconnect] = useIntersectionObserver(() => {
    changePage((v) => v + 1)
  })
  const useSelect = useMemo(() => Boolean(selectedList), [selectedList])
  const displayList = useMemo<FitnessListSelectedProps[]>(() => {
    return list.slice(0, page * 10).map(v => {
      return {
        selected: selectedList?.includes(v) || false,
        idx: v
      }
    })
  }, [list, page, selectedList])

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' })
    changePage(1)
    if (list.length > 10) {
      const spinner = document.getElementById('spinner')
      if (spinner instanceof HTMLElement) {
        observe(spinner)
      }
    } else {
      disconnect()
    }
  }, [list])
  function selectExercise(exercise: FitnessListSelectedProps, selected: boolean) {
    if (changeSelectedList) {
      if (selected) {
        changeSelectedList(([] as number[]).concat(selectedList || [], exercise.idx))
      } else {
        changeSelectedList(selectedList?.filter(e => e !== exercise.idx) || [])
      }
    }
  }
  useEffect(() => {
    const spinner = document.getElementById('spinner')
    if (spinner instanceof HTMLElement) {
      observe(spinner)
    }
    return () => {
      disconnect()
    }
  }, [])
  const spinner = useMemo(() => {
    if (list.length <= 10) return undefined
    return <div className="flex justify-center">
      <Spinner id='spinner' color="primary" size="lg"></Spinner>
    </div>
  }, [list])
  return (
    <div className="flex flex-col gap-y-4 pt-4">
      {displayList.map(exercise => (
        <FitnessItem key={exercise.idx} selectedExercise={exercise} useSelect={useSelect} onClick={selectExercise}></FitnessItem>
      ))}
      {spinner}
    </div>
  );
}