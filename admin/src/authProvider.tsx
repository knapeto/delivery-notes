import { useApolloClient } from '@apollo/client';
import { useMemo } from 'react';

const withAuthProvider = () => {
  const apolloClient = useApolloClient();
  return useMemo(() => {
    return {
      login: async () => {
        console.log('login');
        return true;
      },
      logout: async () => {
        localStorage.removeItem('user');
        await apolloClient.resetStore();
        return Promise.resolve();
      },
      checkError: (error) => {
        const status = error.status;
        if (
          status === 401 ||
          status === 403 ||
          error.message.includes('Not Authorised!')
        ) {
          document.cookie = '';
          localStorage.removeItem('user');
          return Promise.reject({ redirectTo: '/login' });
        }
        // other error code (404, 500, etc): no need to log out
        return Promise.resolve();
      },
      checkAuth: async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
          return Promise.reject({ redirectTo: '/login' });
        }

        return Promise.resolve(user);
      },
      getPermissions: () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return Promise.resolve({
          presetPassword: user?.presetPassword,
        });
      },
      getIdentity: async () => {
        const user = JSON.parse(localStorage.getItem('user'));

        return Promise.resolve(user);
      },
    };
  }, []);
};

export default withAuthProvider;
