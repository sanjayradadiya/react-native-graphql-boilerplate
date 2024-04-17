import {
  CombinedError,
  createClient,
  fetchExchange,
  errorExchange,
  Operation,
} from 'urql';
import authExchange from './authExchange';
import { cacheMutations } from './mutations';
import { cacheExchange } from '@urql/exchange-graphcache';
import { navigationRef } from '@services/routing/navigators';
import { routes } from '@services/routing/routesConfig';
import { appDispatch } from '@services/store/StoreProvider';
import Config from 'react-native-config';
import { Storage } from '@services/storage';
import { logout } from '@modules/auth/controller/auth.controller';

export const getURQLClientUrl = () => {
  const url = Config.BASE_URL;
  return `${url}/api/graphql`;
};

export const getUrqlClient = token => {
  return createClient({
    url: getURQLClientUrl(),
    fetchOptions: {
      headers: {},
    },
    exchanges: [
      cacheExchange({
        updates: { Mutation: cacheMutations },
      }),
      errorExchange({
        onError: async (
          error: CombinedError,
          operation: Operation<any, any>,
        ) => {
          const status = error?.response?.status;

          if (status === 403) {
            Storage.removeItem('access_token');
            appDispatch(logout());
            navigationRef.navigate(routes.auth.login);
            return;
          }
          if (status.toString().startsWith('5') && status !== 504) {

          }
          if (error?.message) {

          }
        },
      }),
      authExchange(token),
      fetchExchange,
    ],
  });
};
