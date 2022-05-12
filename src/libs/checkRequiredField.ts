import { required } from 'react-admin';

const checkRequiredFields = (list: string[], source: string) => {
  const found = list.find((listItem) => listItem === source);

  if (found) {
    return [required()];
  }
  return [];
};

export default checkRequiredFields;

export const getValidate = (props) => {
  let validate = props.validate || [];

  if (props.requiredFieldsList) {
    if (typeof validate === 'object') {
      validate.push(
        ...checkRequiredFields(props.requiredFieldsList, props.source),
      );
    } else {
      validate = [
        validate,
        ...checkRequiredFields(props.requiredFieldsList, props.source),
      ];
    }
  }

  return validate;
};
