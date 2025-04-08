import { useAtom } from 'jotai';
import { fitnessAtom } from '../atom';

export default function useFitnessDataModal() {
  const [fitnessId, setFitnessId] = useAtom(fitnessAtom)
  return {
    fitnessId, setFitnessId
  }
}