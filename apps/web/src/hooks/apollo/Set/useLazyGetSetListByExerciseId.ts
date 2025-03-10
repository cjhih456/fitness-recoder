import { useLazyQuery } from '@apollo/client';
import GetSetListByExerciseIdGql from '@hooks/apollo/Set/graphql/query/GetSetListByExerciseIdGql';

export default function useLazyGetSetListByExerciseId() {
  return useLazyQuery<GetSetListByExerciseIdResponse, GetSetListByExerciseIdVariable>(GetSetListByExerciseIdGql)
}