import { gql } from '@apollo/client';

const DeleteSetGql = gql`
mutation deleteSet($id: Int!) {
  deleteSetById(id: $id)
}`
export default DeleteSetGql