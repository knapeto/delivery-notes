import { NumberInput as AdminNumberInput } from 'react-admin';
import { getValidate } from '../libs/checkRequiredField';
import { useField } from 'react-final-form';

const NumberInput = (props) => {
  const field = useField(props.source);
  const errorMessage = props.error || field?.meta?.error;
  const validate = getValidate(props);

  return (
    <AdminNumberInput
      {...props}
      validate={validate}
      variant="outlined"
      size="small"
      InputLabelProps={{
        error: !!errorMessage,
      }}
      FormHelperTextProps={{
        error: !!errorMessage,
      }}
      InputProps={{
        error: !!errorMessage,
      }}
      error={!!errorMessage}
      helperText={errorMessage}
      style={{ flex: 1, ...props.style }}
    />
  );
};

export default NumberInput;
