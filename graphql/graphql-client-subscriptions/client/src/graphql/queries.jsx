import { gql } from "@apollo/client";

export const GET_ALL_EVENTS = gql`
  query getAllEvent {
    events {
      id
      title
      desc
      date
    }
  }
`;

export const GET_EVENT_BY_ID = gql`
  query getEvent($id: ID!) {
    event(id: $id) {
      id
      title
      desc
      date
      location {
        name
      }
      user {
        username
      }
      participants {
        user {
          username
        }
      }
    }
  }
`;

export const PARTICIPANT_ADDED_SUBSCRIPTION = gql`
  subscription OnParticipantAdded($eventId: ID!) {
    participantCreated(eventId: $eventId) {
      user {
        username
      }
    }
  }
`;
