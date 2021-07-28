import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import Messenger from './Messenger';

class Example extends React.Component {
  // Code

  messageHook(messageArray) {
    /* [
        {
            "senderId": "Bot", // "User"
            "text": "Hello there and welcome!",
            "time": "2021-07-28T09:15:14.975Z"
        }, ...
      ]
    */
    console.log(messageArray);
  }

  render() {
    return <Messenger messageHook={this.messageHook} />;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Example />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
