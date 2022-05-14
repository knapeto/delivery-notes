import { gql, useApolloClient, useQuery } from '@apollo/client';

export const GET_ME = gql`
  query GetMe {
    me {
      id
      email
    }
  }
`;

export function useProfile() {
  const apolloClient = useApolloClient();
  const { data } = useQuery(GET_ME, {
    fetchPolicy: 'cache-and-network',
  });

  const fetchMe = async () => {
    const { data } = await apolloClient.query({
      query: GET_ME,
      fetchPolicy: 'network-only',
    });

    localStorage.setItem('user', data);

    return data;
  };

  return {
    user: data?.me,
    fetchMe,
  };
}
