import { ApolloLink, createHttpLink } from '@apollo/client';
import { baseURL } from '@utils';
import { onError } from '@apollo/client/link/error';

function fetchTimeout(uri: URL | RequestInfo, options: RequestInit | undefined, time = 5000) {
  return new Promise<Response>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('Request Time out'))
    }, time)
    fetch(uri, options).then((response) => {
      clearTimeout(timer)
      resolve(response)
    }, (err) => {
      clearTimeout(timer)
      reject(err)
    })
  })
}

const httpLink = createHttpLink({
  uri: baseURL('/db'),
  fetch(uri, options) {
    return fetchTimeout(uri, options);
  }
})
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (networkError) {
    console.error(`Network Error: ${networkError.message}`);
  }
  if (graphQLErrors) {
    const errMsg = graphQLErrors.map((error) => JSON.stringify(error));
    console.error(`GraphQL Error: ${errMsg}`);
  }
})

export const link = ApolloLink.from([httpLink, errorLink])
