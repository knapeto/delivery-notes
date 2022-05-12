import { DateInput as AdminDateInput } from 'react-admin';
import { getValidate } from '../libs/checkRequiredField';
import { useField } from 'react-final-form';
import { useState } from 'react';

const DateInput = (props) => {
  const [focused, setFocus] = useState(false);
  const field = useField(props.source);
  const errorMessage = props.error || field?.meta?.error;
  const validate = getValidate(props);

  return (
    <AdminDateInput
      {...props}
      validate={validate}
      variant="outlined"
      size="small"
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      label={focused || props.disabled ? props.label : ''}
      InputLabelProps={{
        error: !!errorMessage,
      }}
      FormHelperTextProps={{
        error: !!errorMessage,
      }}
      SelectProps={{
        error: !!errorMessage,
      }}
      error={!!errorMessage}
      helperText={errorMessage}
      style={{ flex: 1, ...props.style }}
    />
  );
};

export default DateInput;
