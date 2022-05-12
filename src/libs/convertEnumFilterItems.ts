import { snakeCase } from 'lodash';

export const convertEnumFilterItems = (object: { [key: string]: string }) =>
  Object.keys(object).map((key) => ({
    id: snakeCase(key).toUpperCase(),
    name: key,
  }));
