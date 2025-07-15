import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_EVENTS } from "../graphql/queries";
import { NEW_EVENT_SUBSCRIPTION } from "../graphql/subscriptions";
import Event from "../components/event/Event";

function Events() {
  const { loading, error, data, subscribeToMore } = useQuery(GET_ALL_EVENTS);

  useEffect(() => {
    console.log("Subscription is starting...");

    const unsubscribe = subscribeToMore({
      document: NEW_EVENT_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newEvent = subscriptionData.data.eventCreated;
        if (prev.events.some((event) => event.id === newEvent.id)) {
          return prev;
        }
        return {
          ...prev,
          events: [...prev.events, newEvent],
        };
      },
      onError: (err) => {
        console.error("Subscription error:", err);
      },
    });

    return () => {
      console.log("Clearing subscription...");
      unsubscribe();
    };
  }, [subscribeToMore]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h1>Events</h1>
      <div className="events">
        {data?.events?.toReversed()?.map((event) => (
          <Event
            key={event.id}
            id={event.id}
            name={event.title}
            desc={event.desc}
            date={event.date}
          />
        ))}
      </div>
    </>
  );
}

export default Events;
