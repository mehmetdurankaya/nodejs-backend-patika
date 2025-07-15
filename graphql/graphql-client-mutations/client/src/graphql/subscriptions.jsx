import { gql } from "@apollo/client";

export const NEW_EVENT_SUBSCRIPTION = gql`
  subscription OnEventCreated {
    eventCreated {
      id
      title
      desc
      date
    }
  }
`;

export const PARTICIPANT_ADDED_SUBSCRIPTION = gql`
  subscription OnParticipantAdded($eventId: ID!) {
    participantCreated(eventId: $eventId) {
      id
      user {
        id
        username
      }
      event {
        id
      }
    }
  }
`;
