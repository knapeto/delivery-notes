import "./App.css";

import { Admin, Login, Resource } from "react-admin";
import { UserCreate, UserEdit, UsersList } from "./modules/users/users";
import styled, { createGlobalStyle } from "styled-components";

import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import ChangeMyPassword from "./modules/users/changeMyPassword";
import { CircularProgress } from "@material-ui/core";
import CustomLayout from "./CustomLayout";
import CustomTheme from "./CustomTheme";
import { DeliveryNotesList } from "./modules/deliveryNotes";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import LoginForm from "./modules/login";
import { Options } from "@ra-data-prisma/dataprovider";
import { Route } from "react-router-dom";
import { appProvidersFactory } from "./appProvidersFactory";
import i18nProvider from "./locales";
import schema from "../src/graphql-schema.json";
import themeReducer from "./reducers/theme";

export const Center = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const SpinnerWrapper = createGlobalStyle`
  html, body, #root {
    height: 100%;
  }
`;

const App: React.VFC<{ client: any }> = ({ client }) => {
  const options: Options = {
    client,
    introspection: {
      schema: (schema as any).__schema,
    },
    queryDialect: "typegraphql",
  };

  const { dataProvider, authProvider } = appProvidersFactory()(options);

  if (!dataProvider) {
    return (
      <Center>
        <SpinnerWrapper />
        <CircularProgress />
      </Center>
    );
  }

  return (
    <Admin
      dataProvider={dataProvider}
      disableTelemetry={true}
      layout={CustomLayout}
      i18nProvider={i18nProvider}
      theme={CustomTheme}
      customReducers={{ theme: themeReducer }}
      loginPage={(props) => (
        <Login {...props}>
          <LoginForm />
        </Login>
      )}
      customRoutes={[
        <Route path="/change-my-password" component={ChangeMyPassword} />,
      ]}
      authProvider={authProvider}
    >
      {(auth) => {
        return auth.presetPassword
          ? [<Resource name="User" />]
          : [
              <Resource
                name="DeliveryNotes"
                options={{ label: "Delivery notes" }}
                list={DeliveryNotesList}
                icon={FindInPageIcon}
              />,
              <Resource
                name="User"
                list={UsersList}
                edit={UserEdit}
                create={UserCreate}
                icon={AssignmentIndIcon}
              />,
            ];
      }}
    </Admin>
  );
};

export default App;
