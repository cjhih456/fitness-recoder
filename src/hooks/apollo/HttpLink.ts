import { ApolloLink, FetchResult, Observable, Operation } from '@apollo/client';
import { print } from 'graphql';
import { Client, ClientOptions, createClient } from 'graphql-http';
import { baseURL } from '../../components/utils';

class HttpLink extends ApolloLink {
  private client: Client
  constructor(options: ClientOptions) {
    super()
    this.client = createClient(options)
  }

  public request(operation: Operation): Observable<FetchResult> {
    return new Observable<FetchResult>((sink) => {
      return this.client.subscribe<FetchResult>(
        { ...operation, query: print(operation.query) },
        {
          // @ts-ignore
          next: sink.next.bind(sink),
          complete: sink.complete.bind(sink),
          error: sink.error.bind(sink),
        },
      );
    });
  }
}

export const link = new HttpLink({
  url: baseURL('/db'),
});