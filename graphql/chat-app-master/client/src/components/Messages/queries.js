import { gql } from "@apollo/client";

export const GET_MESSAGES = gql`
  query getMessages {
    messages {
      id
      user
      text
    }
  }
`;

export const SUBSCRIPTION_MESSAGES = gql`
  subscription {
    messages {
      id
      user
      text
    }
  }
`;