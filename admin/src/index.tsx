import "./index.css";

import { ApolloProvider } from "@apollo/client";
import App from "./App";
import ReactDOM from "react-dom";
import createApolloClient from "./libs/createApolloClient";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(timezone);
dayjs.extend(utc);

export const url = "http://localhost:8080/api";

const client = createApolloClient(url + "/admin/graphql");

ReactDOM.render(
  <ApolloProvider client={client}>
    <App client={client} />
  </ApolloProvider>,
  document.getElementById("root")
);
