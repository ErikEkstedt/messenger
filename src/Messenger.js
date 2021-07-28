import React, { useState } from 'react';
import { BsDownload } from 'react-icons/bs';

import {
  Container,
  Row,
  Col,
  Form,
  ToggleButton,
  ToggleButtonGroup,
  Navbar,
  Nav,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Messenger.css';

const DUMMY_DATA = [
  {
    senderId: 'Bot',
    text: 'Hello there and welcome!',
    time: new Date(),
  },
];

function exportToJson(objectData, filename) {
  // https://stackoverflow.com/questions/45941684/save-submitted-form-values-in-a-json-file-using-react#62128055
  let contentType = 'application/json;charset=utf-8;';
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    var blob = new Blob(
      [decodeURIComponent(encodeURI(JSON.stringify(objectData)))],
      { type: contentType }
    );
    navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    var a = document.createElement('a');
    a.download = filename;
    a.href =
      'data:' +
      contentType +
      ',' +
      encodeURIComponent(JSON.stringify(objectData));
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

function MessageList(props) {
  let messages = props.messages.map((message, index) => {
    // Different styles based on id
    var color = '#EEEEEE';
    var justifySide = 'flex-start';
    if (message.senderId === 'User') {
      color = '#74B9FF';
      justifySide = 'flex-end';
    }
    return (
      <li key={index}>
        <Row style={{ justifyContent: justifySide }}>
          <p
            style={{
              background: color,
              width: 'auto',
            }}
            className="message"
          >
            {message.text}
          </p>
        </Row>
      </li>
    );
  });
  return (
    <Row style={{ padding: '10px' }}>
      <ul className="message-list">{messages}</ul>
    </Row>
  );
}

function SendMessageForm(props) {
  const [message, setMessage] = useState('');
  const [id, setId] = useState('User');

  function handleText(e) {
    setMessage(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.sendMessage(message, id);
    setMessage('');
  }

  return (
    <Row
      style={{
        padding: '10px',
        background: '#EEEEEE',
        border: 'none',
        borderRadius: '0px 0px 10px 10px',
      }}
    >
      <Col style={{ maxWidth: '180px', padding: '0px', margin: 'auto 0' }}>
        {/* Change this to switch?  https://react-bootstrap.netlify.app/components/forms/#forms-custom-switch */}
        <ToggleButtonGroup
          type="radio"
          name="interlocutor"
          onChange={setId}
          value={id}
        >
          <ToggleButton id="userBtn" value="User">
            User
          </ToggleButton>
          <ToggleButton id="botBtn" value="Bot">
            Bot
          </ToggleButton>
        </ToggleButtonGroup>
      </Col>
      <Col style={{ padding: '0px', margin: '0px' }}>
        <Form onSubmit={handleSubmit}>
          <Form.Control
            type="text"
            placeholder="Type your message and hit ENTER"
            onChange={handleText}
            value={message}
          />
        </Form>
      </Col>
    </Row>
  );
}

export default class Messenger extends React.Component {
  constructor() {
    super();
    this.state = { messages: DUMMY_DATA };
    this.sendMessage = this.sendMessage.bind(this);
    this.download = this.download.bind(this);
  }

  sendMessage(text, id) {
    let messages = [
      ...this.state.messages,
      { senderId: id, text: text, time: new Date() },
    ];
    this.setState({ messages: messages });
    if (this.props.messageHook !== undefined) {
      this.props.messageHook(messages);
    }
  }

  download() {
    if (this.state.messages.length === 0) {
      alert('Dialog is empty!');
    } else {
      console.log('Download JSON');
      exportToJson(this.state.messages, 'dialog.json');
    }
  }

  render() {
    return (
      <Container className="messenger">
        <Row>
          <Navbar
            bg="light"
            style={{ border: 'none', borderRadius: '10px 10px 0px 0px' }}
          >
            <Container>
              <Navbar.Brand href="#home">Messenger</Navbar.Brand>
              <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
              <Nav className="justify-content-end">
                <button type="submit" onClick={this.download}>
                  {' '}
                  <BsDownload />{' '}
                </button>
              </Nav>
            </Container>
          </Navbar>
        </Row>

        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage} />
      </Container>
    );
  }
}
