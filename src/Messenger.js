import React, { useState } from 'react';
import { BsDownload } from 'react-icons/bs';
import { VscDebugRestart } from 'react-icons/vsc';

import {
  Button,
  Col,
  Container,
  Form,
  Nav,
  Navbar,
  Row,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Messenger.css';

export function exportToJson(objectData, filename) {
  // https://stackoverflow.com/questions/45941684/save-submitted-form-values-in-a-json-file-using-react#62128055
  let contentType = 'application/json;charset=utf-8;';
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    var blob = new Blob(
      [decodeURIComponent(encodeURI(JSON.stringify(objectData, null, 1)))],
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
      encodeURIComponent(JSON.stringify(objectData, null, 1));
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

export function MessageNav(props) {
  const btnStyle = { margin: '5px 5px' };
  return (
    <Row>
      <Navbar
        bg="light"
        style={{ border: 'none', borderRadius: '10px 10px 0px 0px' }}
      >
        <Container>
          <Navbar.Brand href="#home">{props.title}</Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
          <Nav className="justify-content-end">
            <button type="submit" onClick={props.clear} style={btnStyle}>
              {' '}
              <VscDebugRestart />{' '}
            </button>
            <button type="submit" onClick={props.download} style={btnStyle}>
              {' '}
              <BsDownload />{' '}
            </button>
          </Nav>
        </Container>
      </Navbar>
    </Row>
  );
}
export function MessageList(props) {
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

export function MessageForm(props) {
  const userBackground = '#EEEEEE';
  const userPlaceHolder = 'Type user message and hit ENTER';
  const botBackground = '#EEA0A0';
  const botPlaceHolder = 'Type BOT message and hit ENTER';
  const [message, setMessage] = useState('');
  const [id, setId] = useState('User');
  const [background, setBackground] = useState(userBackground);
  const [placeHolder, setPlaceHolder] = useState(userPlaceHolder);

  return (
    <Container fluid style={{ padding: '0px' }}>
      <Row
        md={12}
        lg={12}
        style={{ background: background, padding: '20px 0px 0px 0px' }}
      >
        <Col md={1} lg={1}>
          <Row>
            <Form.Switch
              onChange={(e) => {
                if (e.target.value === 'User') {
                  setId('Bot');
                  setBackground(botBackground);
                  setPlaceHolder(botPlaceHolder);
                } else {
                  setId('User');
                  setBackground(userBackground);
                  setPlaceHolder(userPlaceHolder);
                }
              }}
              value={id}
              id="role-switch"
              style={{ padding: '0px 0px 0px 2.5em' }}
            />
          </Row>
          <Row>
            {' '}
            <h6> Bot </h6>
          </Row>
        </Col>
        <Col md={9} lg={9}>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              props.userInputMessage(message, id);
              setMessage('');
            }}
          >
            <Form.Control
              type="text"
              placeholder={placeHolder}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
          </Form>
        </Col>
        <Col md={2} lg={2}>
          <Button
            onClick={props.respond}
            className="btn-success"
            style={{
              fontSize: '.6em',
              padding: '5px',
              height: '75%',
            }}
          >
            {' '}
            Model response{' '}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
