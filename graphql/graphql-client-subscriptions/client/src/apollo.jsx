import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/graphql",
    connectionParams: () => {
      return {
        headers: {},
      };
    },
    on: {
      connected: () => console.log("WebSocket connection established"),
      error: (err) => console.error("WebSocket error:", err),
      closed: () => console.log("WebSocket connection closed"),
    },
    shouldRetry: (err) => {
      console.error("WebSocket hatası:", err);
      return true;
    },
    retryAttempts: 5,
    retryWait: (retryCount) => {
      const delay = Math.min(1000 * 2 ** retryCount, 10000);
      return new Promise((resolve) => setTimeout(resolve, delay));
    },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
