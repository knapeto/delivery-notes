import { camelCase, head, startCase } from 'lodash';

import { useNotify } from 'react-admin';
import { useState } from 'react';

export const useErrors = () => {
  const notify = useNotify();
  const [errors, setErrors] = useState(undefined);
  const handleSetErrors = (errorResponse: any) => {
    let errorResult = undefined;

    const findInChildren = (validationError) => {
      const { property, constraints, children } = validationError;

      if (property && constraints) {
        errorResult = errorResult || {};
        errorResult[property] = startCase(
          camelCase(head(Object.values(constraints))),
        );
      }

      if (children && children.length) {
        children.forEach(findInChildren);
      }
    };

    (errorResponse?.graphQLErrors || []).forEach((graphQLError) => {
      if (!graphQLError?.extensions.exception.validationErrors) {
        notify(
          graphQLError?.extensions.exception.response.generalErrorCode,
          'error',
        );
      }

      if (graphQLError?.extensions?.exception?.validationErrors.length) {
        graphQLError?.extensions?.exception?.validationErrors.forEach(
          findInChildren,
        );
      }
    });

    setErrors(errorResult);
  };
  return {
    handleSetErrors,
    errors,
  };
};
