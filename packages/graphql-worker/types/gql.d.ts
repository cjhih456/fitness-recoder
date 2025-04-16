declare module '*.gql' {
  const Query: import('graphql').DocumentNode;
  export default Query;

  export const _queries: Record<string, import('graphql').DocumentNode>;
  export const _fragments: Record<
    string,
    import('graphql').FragmentDefinitionNode
  >;
}

declare module '*.graphql' {
  const Query: import('graphql').DocumentNode;
  export default Query;

  export const _queries: Record<string, import('graphql').DocumentNode>;
  export const _fragments: Record<
    string,
    import('graphql').FragmentDefinitionNode
  >;
}

declare type ResponseResolver<Args, Return> = import('@graphql-tools/utils').IFieldResolver<any, {
  client: string
}, Args, Return | Promise<Return>>

declare type ResponseBuilder<Args, Return> = (
  dbTransitionBus: import('../src/transaction/MessageTransactionBus').default | undefined,
  context: {
    client: string
  },
  args: Args
) => Promise<Return>
