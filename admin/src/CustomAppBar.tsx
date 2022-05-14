import { AppBar, MenuItemLink, UserMenu, useGetIdentity } from "react-admin";

import LockIcon from "@material-ui/icons/Lock";
import ThemeSwitcher from "./ThemeSwitcher";
import Typography from "@material-ui/core/Typography";
import { forwardRef } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  title: {
    flex: 1,
    textAlign: "center",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  logo: {
    flex: 1,
    maxWidth: "100px",
    marginLeft: 0,
    display: "flex",
    alignItems: "center",
  },
});

const ChangeMyPasswordMenu = forwardRef<any, any>((props, ref) => {
  return (
    <MenuItemLink
      ref={ref}
      to="/change-my-password"
      primaryText="Change my password"
      style={{ marginLeft: -4 }}
      leftIcon={<LockIcon />}
      onClick={props.onClick}
      sidebarIsOpen
    />
  );
});

const CustomUserMenu = (props: any) => {
  const { identity } = useGetIdentity();
  return (
    <UserMenu {...props}>
      {!identity?.isAd && <ChangeMyPasswordMenu />}
    </UserMenu>
  );
};

const CustomAppBar = (props) => {
  const classes = useStyles();
  return (
    <AppBar {...props} elevation={1} userMenu={<CustomUserMenu />}>
      <img src="/logo_header.png" alt="logo" className={classes.logo} />
      <Typography
        variant="h6"
        color="inherit"
        className={classes.title}
        id="react-admin-title"
      />
      {/* <LocaleSwitcher /> */}
      <ThemeSwitcher />
    </AppBar>
  );
};

export default CustomAppBar;
