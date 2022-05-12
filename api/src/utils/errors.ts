import { ApolloError } from 'apollo-server-errors';

export const formatError = (err: any) => {
  // Don't give the specific errors to the client.
  console.error(JSON.stringify(err));
  if (err.metadata) {
    return new ApolloError('Internal server error', 'INTERNAL_SERVER_ERROR');
  }

  // Otherwise return the original error.  The error can also
  // be manipulated in other ways, so long as it's returned.
  return err;
};
