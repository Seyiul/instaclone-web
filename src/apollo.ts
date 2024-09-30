import {
  ApolloClient,
  ApolloLink,
  Context,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import routes from "./routes";
import { History } from "history";

const TOKEN = "TOKEN";
const DARK_MODE = "DARK_MODE";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

export const logUserIn = (token: string) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};
export const logUserOut = (history: History) => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  history.replace({
    pathname: routes.home,
    state: undefined,
  });
};

export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, "enable");
  darkModeVar(true);
};

export const disableDarkMode = () => {
  localStorage.removeItem(DARK_MODE);
  darkModeVar(false);
};

const httpLink = createHttpLink({ uri: "http://localhost:4000/graphql" });
const authLink = new ApolloLink((operation, forward) => {
  operation.setContext((context: Context) => ({
    headers: {
      ...context.headers,
      token: localStorage.getItem(TOKEN),
    },
  }));
  return forward(operation);
});

export const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        keyFields: (obj) => `User:${obj.username}`,
      },
    },
  }),
  link: authLink.concat(httpLink),
});
