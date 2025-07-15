import { useQuery, useSubscription } from '@apollo/client';
import { GET_MESSAGES, SUBSCRIPTION_MESSAGES } from './queries';

function Messages({ user }) {
  const { data } = useQuery(GET_MESSAGES, {
    pollInterval: 500,
  })

//   const { data } = useSubscription(SUBSCRIPTION_MESSAGES)

  if(!data) return null;

  return (
    <>
        {
            data.messages.map(({ id, user: messageUser, text }) => (
                <div key={id} style={{ 
                    display: "flex", 
                    justifyContent: user === messageUser ? "flex-end" : "flex-start",
                    paddingBottom: "1em"
                    }}>
                    {
                        user !== messageUser && (
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: 50,
                                width: 50,
                                marginRight: "0.5em",
                                border: "2px solid #e5e6ea",
                                borderRadius: 25,
                                textAlign: "center",
                                fontSize: "16pt",
                            }}>
                                { messageUser.slice(0,2).toUpperCase()}
                            </div>
                        )
                    }
                    <div style={{
                        background: user === messageUser ? "#58bf56" : "#e5e6ea",
                        color: user === messageUser ? "white" : "black",
                        padding: "1em",
                        borderRadius: "1em",
                        maxWidth: "60%"
                    }}>
                        {text}
                    </div>
                </div>
            ))
        }
    </>
  )
}

export default Messages