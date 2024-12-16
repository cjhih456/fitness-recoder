import { useLazyQuery } from '@apollo/client';
import GetSetListByExerciseIdGql from '@graphQuery/Query/Set/GetSetListByExerciseIdGql';

export default function useLazyGetSetListByExerciseId() {
  return useLazyQuery<GetSetListByExerciseIdResponse, GetSetListByExerciseIdVariable>(GetSetListByExerciseIdGql)
}