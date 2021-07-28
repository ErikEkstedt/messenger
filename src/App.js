import React from 'react';
import { Container } from 'react-bootstrap';
import {
  MessageNav,
  MessageList,
  MessageForm,
  exportToJson,
} from './Messenger';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.userInputMessage = this.userInputMessage.bind(this);
    this.respond = this.respond.bind(this);
    this.download = this.download.bind(this);
  }

  userInputMessage(text, id) {
    let message = {
      senderId: id,
      text: text,
      time: new Date().toLocaleString(),
    };
    this.setState({ messages: [...this.state.messages, message] });
  }

  cleanMessageArray() {
    let lastId = '';
    let cleanArray = [];
    this.state.messages.forEach((msg) => {
      if (msg.senderId === lastId) {
        cleanArray[cleanArray.length - 1] += ' ' + msg.text;
      } else {
        lastId = msg.senderId;
        cleanArray.push(msg.text);
      }
    });
    return cleanArray;
  }

  async respond() {
    let clean = this.cleanMessageArray();
    fetch('/respond', {
      method: 'POST',
      body: JSON.stringify({ messages: clean }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((res) => {
        this.setState({
          messages: [
            ...this.state.messages,
            {
              text: res.text,
              senderId: 'Bot',
              time: new Date().toLocaleString(),
            },
          ],
        });
      });
  }

  clear() {
    this.setState({ messages: [] });
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
      <Container style={{ border: 'solid black', borderRadius: '5px' }}>
        <MessageNav
          download={this.download}
          clear={() => {
            this.setState({ messages: [] });
          }}
          title="Messenger"
        />
        <MessageList messages={this.state.messages} />
        <MessageForm
          userInputMessage={this.userInputMessage}
          respond={this.respond}
        />
      </Container>
    );
  }
}
