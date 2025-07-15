import { GraphQLServer, PubSub } from 'graphql-yoga';
import { nanoid } from 'nanoid';

const messages = [];

const typeDefs = `
    type Message {
        id: ID!
        user: String!
        text: String!
    }

    type Query {
        messages: [Message!]
    }

    type Mutation {
        postMessage(user: String!, text: String!): ID!
    }

    type Subscription {
        messages: [Message!]
    }
`;

const subscribers = [];
const onMessagesUpdates = (fn) => subscribers.push(fn);

const resolvers = {
    Query: {
        messages: () => messages,
    },

    Mutation: {
        postMessage: (parent, { user, text }) => {
            const id = nanoid();
            messages.push({ id, user, text});
            subscribers.forEach(fn => fn());
            return id;
        }
    },

    Subscription: {
        messages: {
            subscribe: (parent, args, { pubsub }) => {
                const channel = Math.random().toString(36).slice(2,15);
                onMessagesUpdates(() => pubsub.publish(channel, { messages }));
                setTimeout(() => pubsub.publish(channel, { messages }), 0);
                return pubsub.asyncIterator(channel);
            }
        }
    }
}

const pubsub = new PubSub();
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub} });
server.start(( { port }) => {
    console.log(`Server on http://localhost:${port}/`);
})