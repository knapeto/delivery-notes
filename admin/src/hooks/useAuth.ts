import cookie from "js-cookie";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        email
        isAd
        isAdmin
        presetPassword
      }
      access_token
    }
  }
`;

export function useAuth() {
  const [login] = useMutation(LOGIN_MUTATION);

  const handleLogin = async (email: string, password: string) => {
    const { data } = await login({
      variables: { email, password },
    });

    if (data?.login.access_token) {
      cookie.set("access_token", data.login.access_token, {
        httpOnly: false,
      });

      localStorage.setItem("user", JSON.stringify(data?.login.user));

      return data?.login?.user;
    }

    return false;
  };

  return {
    handleLogin,
  };
}
