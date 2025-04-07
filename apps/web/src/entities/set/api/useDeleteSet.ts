import { useMutation } from '@apollo/client';
import DeleteSetGql from '@entities/set/api/graphql/mutation/DeleteSetGql';

export default function useDeleteSet() {
  return useMutation<DeleteSetResponse, DeleteSetVariable>(DeleteSetGql)
}