import { AutocompleteInput, ReferenceInput } from 'react-admin';

import { useForm } from 'react-final-form';

const UserInput = (props) => {
  const form = useForm();
  const handleSelectUser = (user) => {
    form.change('firstName', user.firstName);
    form.change('lastName', user.lastName);
    form.change('address', user.address);
    form.change('houseNumber', user.houseNumber);
    form.change('city', user.city);
    form.change('country', user.country);
    form.change('birthdate', user.birthdate);
  };

  return (
    <ReferenceInput
      source="user"
      reference="User"
      label="Find user details"
      style={{ flex: 1 }}
      allowEmpty
      {...props}>
      <AutocompleteInput
        onSelect={handleSelectUser}
        variant="outlined"
        size="small"
        optionText={(record) => {
          if (!record || !record.id) {
            return 'Clear';
          }
          return `${record.firstName} ${record.lastName} (${record.email})`;
        }}
      />
    </ReferenceInput>
  );
};

export default UserInput;
