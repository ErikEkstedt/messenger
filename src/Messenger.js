import React from 'react';
import './Messenger.css';
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

const DUMMY_DATA = [
  {
    senderId: 'Bot',
    text: 'Hello there and welcome!',
  },
  {
    senderId: 'User',
    text: 'Hi!',
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

class Messenger extends React.Component {
  constructor() {
    super();
    this.state = { messages: DUMMY_DATA };
    // this.state = { messages: [] };
    this.sendMessage = this.sendMessage.bind(this);
    this.download = this.download.bind(this);
  }

  sendMessage(text, id) {
    console.log('Send message: ' + id + ': ' + text);
    this.setState({
      messages: [...this.state.messages, { senderId: id, text: text }],
    });
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
              <Navbar.Brand>Messenger</Navbar.Brand>
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

class MessageList extends React.Component {
  render() {
    return (
      <Row style={{ padding: '10px' }}>
        <ul className="message-list">
          {this.props.messages.map((message, index) => {
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
          })}
        </ul>
      </Row>
    );
  }
}

class SendMessageForm extends React.Component {
  constructor() {
    super();
    this.state = { message: '', id: 'User' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ message: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.sendMessage(this.state.message, this.state.id);
    this.setState({
      message: '',
    });
  }

  handleRoleChange(e) {
    console.log('Role change! ' + e);
    this.setState({
      id: e,
    });
  }

  render() {
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
            onChange={this.handleRoleChange}
            value={this.state.id}
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
          <Form onSubmit={this.handleSubmit}>
            <Form.Control
              type="text"
              placeholder="Type your message and hit ENTER"
              onChange={this.handleChange}
              value={this.state.message}
            />
          </Form>
        </Col>
      </Row>
    );
  }
}

export default Messenger;
