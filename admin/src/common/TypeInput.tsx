import { SelectInput, useCreate } from 'react-admin';
import { useEffect, useState } from 'react';
import { useField, useForm } from 'react-final-form';

import { getValidate } from '../libs/checkRequiredField';

const TypeInput = (props) => {
  const form = useForm();
  const field = useField(props.source);
  const [create] = useCreate();

  const errorMessage = props.error || field?.meta?.error;

  const [list, setList] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    setList(
      (props.data || []).map((item) => ({
        id: item.id,
        name: item.name,
      })),
    );
  }, [props.data]);

  const validate = getValidate(props);

  return (
    <SelectInput
      {...props}
      validate={validate}
      source={props.source}
      choices={list || []}
      variant="outlined"
      label={props.label}
      style={{ flex: 1, marginBottom: 0, ...props.style }}
      onCreate={async () => {
        const newValue = prompt('Enter a new value');
        const newRecord = await create(
          props.reference,
          {
            name: newValue,
          },
          {
            returnPromise: true,
          },
        );

        const item = {
          id: newRecord?.data?.id,
          name: newRecord?.data?.name,
        };

        setList([...list, item]);

        form.change(props.source, item.id);

        return item;
      }}
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
    />
  );
};

export default TypeInput;
