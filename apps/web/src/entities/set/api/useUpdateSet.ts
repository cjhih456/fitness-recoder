import { useMutation } from '@apollo/client'
import UpdateSetGql from './graphql/mutation/UpdateSetGql';

export default function useUpdateSet() {
  return useMutation<UpdateSetResponse, UpdateSetVariable>(UpdateSetGql)
}