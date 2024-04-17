import {makeOperation} from 'urql';
import {
  filter,
  fromPromise,
  fromValue,
  makeSubject,
  map,
  merge,
  mergeMap,
  pipe,
  share,
} from 'wonka';

import refreshTokens from './refreshTokens';
import {nanoid} from '@utils/nanoid';

const isAuthErrorCheck = error => {
  return error?.response?.status === 401;
};

const addTokenToOperation = (operation, token) => {
  const {fetchOptions, url} = operation.context;
  const options =
    typeof fetchOptions === 'function' ? fetchOptions() : fetchOptions || {};
  const operationName = operation.query?.definitions?.[0]?.name?.value;;
  const operationUrl = options?.headers?.['x-request-id']
    ? url
    : url + `?op=${operationName}`;
  const headers = {
    ...options.headers,
    'x-request-id': `MOB-${nanoid()}`,
    'x-operation-name': operationName,
    Authorization: `Bearer ${token}`,
  };
  return makeOperation(operation.kind, operation, {
    ...operation.context,
    url: operationUrl,
    fetchOptions: {...fetchOptions, headers},
  });
};

const authExchange =
  (token) =>
  ({forward}) => {
    return ops$ => {
      const sharedOps$ = pipe(ops$, share);
      const {source: retry$, next: nextRetryOperation} = makeSubject();
      const withToken$ = pipe(
        merge([sharedOps$, retry$]),
        filter(operation => operation.kind !== 'teardown'),
        mergeMap(operation => fromValue(addTokenToOperation(operation, token))),
      );

      const withoutToken$ = pipe(
        merge([sharedOps$, retry$]),
        filter(operation => operation.kind === 'teardown'),
      );

      return pipe(
        merge([withToken$, withoutToken$]),
        forward,
        share,
        mergeMap(result => {
          const isAuthError = result.error && isAuthErrorCheck(result.error);

          if (isAuthError) {
            return pipe(
              fromPromise(refreshTokens()),
              map(tokenResult => {
                if (tokenResult) {
                  nextRetryOperation(result.operation);
                }
                return result;
              }),
            );
          }
          return fromValue(result);
        }),
        filter(result => {
          if (result.error) {
            return !isAuthErrorCheck(result.error);
          }
          return true;
        }),
      );
    };
  };

export default authExchange;
