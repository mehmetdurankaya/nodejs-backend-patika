import { useState } from 'react';
import Messages from "../Messages";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useMutation, useSubscription } from '@apollo/client';
import { POST_MESSAGE } from './queries';
import ScrollableFeed from 'react-scrollable-feed';

export default function Chat() {
  const [state, setState] = useState({ user: 'Emre', text: ''})
  const [postMessage] = useMutation(POST_MESSAGE);

  const onSend = () => {
    if(state.text.length > 0) {
      postMessage({
        variables: state,
      });
    }

    setState({
      ...state,
      text: ''
    })
  }
    return (
      <div style={{ width: '100vw', height: '100vh'}}>
      <ScrollableFeed>
        <Container>
          <Messages user={state.user} />
          <Row>
            <Col xs={2}>
              <Form.Control type="text" placeholder="Enter name" value={state.user} onChange={(e) => setState({...state, user: e.target.value})} />
            </Col>
            <Col xs={8}>
              <Form.Control type="text" placeholder="Enter text" value={state.text} onChange={(e) => setState({...state, text: e.target.value})} onKeyUp={(e) => { if(e.key === 13) { onSend(); }}}/>
            </Col>
            <Col xs={2}>
              <Button variant="primary" style={{ width: "100%" }} onClick={() => onSend()}>Send Message</Button>
            </Col>
          </Row>
        </Container>
      </ScrollableFeed>
      </div>
    )
  }