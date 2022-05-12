import {
  TextInput as AdminTextInput,
  BooleanField,
  BooleanInput,
  Create,
  Datagrid,
  DeleteWithConfirmButton,
  Edit,
  EditButton,
  Filter,
  NullableBooleanInput,
  List as RAList,
  SimpleForm,
  TextField,
  required,
  useGetIdentity,
} from "react-admin";
import { Grid, Typography } from "@mui/material";

import CustomPagination from "../../CustomPagination";
import TextInput from "../../common/TextInput";
import styled from "styled-components";
import { useErrors } from "../../libs/useErrors";

const StyledBorder = styled.div`
  border: 1px solid #e0e0e3;
  padding: 12px;
  padding-top: 20px;
  position: relative;
  border-radius: 4px;
`;

const StyledTypography = styled(Typography)`
  position: absolute;
  top: -16px;
  background: #fff;
  padding: 0 10px;
`;

const UserForm = (props) => {
  const { errors } = props;
  const identity = useGetIdentity();

  return (
    <div>
      <Typography variant="h5" style={{ marginBottom: 30 }}>
        {props.id ? "Edit user" : "Create user"}
      </Typography>
      <Grid container spacing={8}>
        <Grid item md={4}>
          <StyledBorder>
            <StyledTypography variant="h6" style={{ marginBottom: 24 }}>
              Basic info
            </StyledTypography>
            <TextInput
              source="firstName"
              error={errors?.firstName}
              style={{ width: "100%" }}
            />
            <TextInput
              source="lastName"
              error={errors?.lastName}
              style={{ width: "100%" }}
            />
            <TextInput
              source="email"
              validate={[required()]}
              error={errors?.email}
              style={{ width: "100%" }}
            />
            {true && (
              <BooleanInput
                source="isAdmin"
                error={errors?.isAdmin}
                style={{ width: "100%" }}
              />
            )}
            {!props.record?.id && (
              <TextInput
                source="password"
                error={errors?.password}
                validate={[required()]}
                style={{ width: "100%" }}
              />
            )}
          </StyledBorder>
        </Grid>
        <Grid item md={4}></Grid>
        <Grid item md={4}></Grid>
      </Grid>
    </div>
  );
};

export const UserCreate = (props: any) => {
  const { errors, handleSetErrors } = useErrors();
  return (
    <Create
      {...props}
      undoable={false}
      onFailure={(errors) => handleSetErrors(errors)}
    >
      <SimpleForm
        initialValues={{
          isAd: false,
          isAdmin: false,
        }}
      >
        <UserForm {...props} errors={errors} />
      </SimpleForm>
    </Create>
  );
};

export const UserEdit = (props: any) => {
  const { errors, handleSetErrors } = useErrors();
  return (
    <Edit
      {...props}
      undoable={false}
      onFailure={(errors) => handleSetErrors(errors)}
    >
      <SimpleForm>
        <UserForm {...props} errors={errors} />
      </SimpleForm>
    </Edit>
  );
};

export const UserFilter = (props: any) => (
  <Filter {...props}>
    <AdminTextInput label="Search" source="q" alwaysOn />
    <AdminTextInput source="email" />
    <AdminTextInput source="firstName" />
    <AdminTextInput source="lastName" />
    <NullableBooleanInput source="isAdmin" />
    <NullableBooleanInput source="isAd" />
  </Filter>
);

const CustomDeleteButton = (props) => {
  const { identity } = useGetIdentity();

  if (identity?.id === props?.record?.id) return null;

  return (
    <DeleteWithConfirmButton mutationMode="pessimistic" record={props.record} />
  );
};

export const UsersList = (props: any) => {
  return (
    <RAList
      {...props}
      bulkActionButtons={false}
      filters={<UserFilter />}
      filter={{
        deletedAt: { equals: null },
      }}
      pagination={<CustomPagination />}
    >
      <Datagrid>
        <TextField source="email" />
        <TextField source="firstName" />
        <TextField source="lastName" />
        <BooleanField source="isA" />
        <BooleanField source="isAdmin" />
        <CustomDeleteButton />
        <EditButton />
      </Datagrid>
    </RAList>
  );
};
