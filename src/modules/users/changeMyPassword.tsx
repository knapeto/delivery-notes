import {
  Alert,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { Title, useGetIdentity, useUpdate } from 'react-admin';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useState } from 'react';

const ChangeMyPassword = () => {
  const { identity } = useGetIdentity();
  const [update, { loading }] = useUpdate();
  const [values, setValues] = useState({
    newPassword: '',
    showNewPassword: false,
    confirmPassword: '',
    showConfirmPassword: false,
    showErrorPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.value,
      showErrorPassword: false,
    });
  };

  const handleShowPassword = (type, value) => {
    setValues({
      ...values,
      [type]: value,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async () => {
    if (loading) return false;

    if (!values.newPassword || !values.confirmPassword) {
      return handleShowPassword(
        'showErrorPassword',
        'Password value is missing!',
      );
    }

    if (values.newPassword !== values.confirmPassword) {
      return handleShowPassword(
        'showErrorPassword',
        'New password and confirm password should be the same!',
      );
    }

    const data: any = {
      password: values.newPassword,
      presetPassword: false,
    };

    await update('User', identity?.id, data, {
      returnPromise: true,
    });

    localStorage.setItem(
      'user',
      JSON.stringify({ ...identity, presetPassword: false }),
    );

    window.location.href = '/';
  };

  return (
    <Card>
      <Title title="Change my password" />
      <CardContent>
        <form onSubmit={onSubmit}>
          {values.showErrorPassword && (
            <Alert severity="error" style={{ marginBottom: 26 }}>
              {values.showErrorPassword}
            </Alert>
          )}

          <FormControl size="small">
            <InputLabel>New password</InputLabel>
            <OutlinedInput
              type={values.showNewPassword ? 'text' : 'password'}
              size="small"
              label="New password"
              value={values.newPassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      handleShowPassword(
                        'showNewPassword',
                        !values.showNewPassword,
                      )
                    }
                    onMouseDown={handleMouseDownPassword}
                    edge="end">
                    {values.showNewPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              onChange={handleChange('newPassword')}
            />
          </FormControl>

          <br />

          <FormControl size="small" style={{ marginTop: 20 }}>
            <InputLabel>Confirm new password</InputLabel>
            <OutlinedInput
              type={values.showConfirmPassword ? 'text' : 'password'}
              size="small"
              label="Confirm new password"
              value={values.confirmPassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      handleShowPassword(
                        'showConfirmPassword',
                        !values.showConfirmPassword,
                      )
                    }
                    onMouseDown={handleMouseDownPassword}
                    edge="end">
                    {values.showConfirmPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              onChange={handleChange('confirmPassword')}
            />
          </FormControl>

          <br />

          <Button
            variant="contained"
            style={{ marginTop: 20 }}
            startIcon={<SaveIcon />}
            disabled={loading}
            onClick={onSubmit}>
            Save
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangeMyPassword;
