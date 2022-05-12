import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';

import cookie from 'js-cookie';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

const headerLink = setContext(async (_, { headers }) => {
  try {
    const token = cookie.get('access_token');
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  } catch (error) {
    console.log(error);
  }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const createApolloClient = (endpoint: string) => {
  console.log(`Connecting to ${endpoint}`);

  return new ApolloClient({
    link: ApolloLink.from([
      headerLink,
      errorLink,
      createUploadLink({ uri: endpoint }) as any,
    ]),
    cache: new InMemoryCache(),
  });
};
export default createApolloClient;
