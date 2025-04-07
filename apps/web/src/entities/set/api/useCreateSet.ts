import { useMutation } from '@apollo/client'
import CreateSetGql from '@entities/set/api/graphql/mutation/CreateSetGql';

export default function useCreateSet() {
  return useMutation<CreateSetResponse, CreateSetVariable>(CreateSetGql)
}