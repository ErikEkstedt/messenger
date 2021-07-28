# Messenger

A simple chat messenger.

```javascript
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
```
