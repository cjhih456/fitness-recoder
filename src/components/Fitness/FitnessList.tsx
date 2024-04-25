import { Spinner } from '@nextui-org/react';
import FitnessItem from './FitnessItem';
import { useEffect, useMemo, useState } from 'react';
import useIntersectionObserver from '../../hooks/IntersectionObserver';

interface FitnessListProps {
  list: IExercise[]
}

export default function FitnessList({ list }: FitnessListProps) {
  const [page, changePage] = useState(1)
  const [observe, disconnect] = useIntersectionObserver(() => {
    changePage((v) => v + 1)
  })
  const displayList = useMemo(() => list.slice(0, page * 10), [list, page])
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
        <FitnessItem key={exercise.name} exercise={exercise}></FitnessItem>
      ))}
      {spinner}
    </div>
  );
}