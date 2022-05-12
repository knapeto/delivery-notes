import { Checkbox, FormControlLabel } from '@mui/material';

const CustomManyToManySelectInput = props => {
  const { choices, input } = props;

  const handleChangeEquipments = async (id: string) => {
    let newEquipments = Object.assign([], input.value);

    if (newEquipments.includes(id)) {
      newEquipments = newEquipments.filter((item: string) => item !== id);
    } else {
      newEquipments.push(id);
    }

    input.onChange(newEquipments);
  };

  return choices.map(item => (
    <FormControlLabel
      key={item.id}
      style={{ width: '20%' }}
      checked={input.value.includes(item.id)}
      defaultChecked={input.value.includes(item.id)}
      control={<Checkbox />}
      onChange={() => handleChangeEquipments(item.id)}
      label={item.name}
    />
  ));
};

export default CustomManyToManySelectInput;
