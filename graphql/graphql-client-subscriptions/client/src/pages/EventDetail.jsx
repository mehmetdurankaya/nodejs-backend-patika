import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@apollo/client";
import { GET_EVENT_BY_ID } from "../graphql/queries";
import { PARTICIPANT_ADDED_SUBSCRIPTION } from "../graphql/subscriptions";

function EventDetail() {
  const { id } = useParams();

  const { loading, error, data, subscribeToMore } = useQuery(GET_EVENT_BY_ID, {
    variables: { id },
  });

  React.useEffect(() => {
    if (!id) return;

    const unsubscribe = subscribeToMore({
      document: PARTICIPANT_ADDED_SUBSCRIPTION,
      variables: { eventId: id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data?.participantCreated) return prev;

        const newParticipant = subscriptionData.data.participantCreated;
        const participantExists = prev.event.participants.some(
          (p) => p.user.id === newParticipant.user.id
        );

        if (!participantExists) {
          return {
            ...prev,
            event: {
              ...prev.event,
              participants: [
                ...prev.event.participants,
                {
                  ...newParticipant,
                  __typename: "Participant",
                },
              ],
            },
          };
        }
        return prev;
      },
      onError: (err) => {
        console.error("Subscription error:", err);
      },
    });

    return () => unsubscribe();
  }, [id, subscribeToMore]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.event) return <p>Event not found</p>;

  const { event } = data;

  return (
    <div className="events">
      <h1 className="event-detail-title">{event.title}</h1>
      <h4 className="event-info">
        Event Date: <span>{event.date}</span>
      </h4>
      <h4 className="event-info">
        Event Owner: <span>{event.user.username}</span>
      </h4>
      <h4 className="event-info">
        Event Location: <span>{event.location.name}</span>
      </h4>
      <p>{event.desc}</p>

      <h4 className="event-info">Participants</h4>
      <ul>
        {event.participants.map((p) => (
          <li key={`participant-${p.user.id}`}>{p.user.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default EventDetail;
