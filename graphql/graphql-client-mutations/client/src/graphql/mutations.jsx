import { gql } from "@apollo/client";

export const CREATE_EVENT = gql`
  mutation createEvent($data: CreateEventInput!) {
    createEvent(data: $data) {
      title
      desc
      date
    }
  }
`;
