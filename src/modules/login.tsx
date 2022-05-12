import { Button, TextField } from "@material-ui/core";
import { Notification, defaultTheme, useNotify } from "react-admin";

import PropTypes from "prop-types";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";
import { useAuth } from "src/hooks/useAuth";
import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useAuth();

  const notify = useNotify();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const login = await handleLogin(email, password);
      if (login?.presetPassword) {
        window.location.href = "/#/change-my-password";
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      notify("Invalid email or password");
    }
  };

  return (
    <ThemeProvider theme={createTheme(defaultTheme)}>
      <form onSubmit={submit} style={{ padding: "0 20px 20px 20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 6,
            marginBottom: 20,
          }}
        >
          <img src="/logo_header.png" alt="logo" />
        </div>

        <div>
          <TextField
            name="email"
            type="email"
            style={{ width: "100%" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <TextField
            name="password"
            type="password"
            style={{ width: "100%" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Button color="primary" type="submit" onClick={submit}>
            Login
          </Button>
        </div>
      </form>
      <Notification />
    </ThemeProvider>
  );
};

LoginForm.propTypes = {
  authProvider: PropTypes.func,
  previousRoute: PropTypes.string,
};

const LoginWithTheme = (props: any) => <LoginForm {...props} />;

export default LoginWithTheme;
