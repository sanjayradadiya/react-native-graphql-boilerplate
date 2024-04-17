import {Cache, FieldInfo, UpdateResolver} from '@urql/exchange-graphcache';
import isArray from 'lodash/isArray';

export const invalidateQuery =
  (key: string | string[]): UpdateResolver =>
  (_, __, cache) => {
    cache
      .inspectFields('Query')
      .filter(({fieldName}) =>
        isArray(key) ? key.includes(fieldName) : fieldName === key,
      )
      .forEach(query =>
        cache.invalidate('Query', query.fieldName, query.arguments),
      );
  };

export const inspectCache = (
  cache: Cache,
  entity: string,
  fieldName: string,
  callback: (field: FieldInfo) => void,
) => {
  cache
    .inspectFields(entity)
    .filter(field => field.fieldName === fieldName)
    .map(callback);
};
