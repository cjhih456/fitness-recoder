import { useAtom } from 'jotai';
import { fitnessAtom } from '../../lib/store/fitness-data-modal';

export default function useFitnessDataModal() {
  const [fitnessId, setFitnessId] = useAtom(fitnessAtom)
  return {
    fitnessId, setFitnessId
  }
}