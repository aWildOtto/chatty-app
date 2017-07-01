import React, {Component} from 'react';
import Message from './Message.jsx';

  
class MessageList extends Component {
  
  render() {
    return (
      <div className="messages">
        {this.props.messages.map((message)=>{
          switch(message.type){
            case "incoming message":
              return <Message key = {message.id} color = {message.color} content = {message.content} username = {message.username}/>;
            case "incoming notification":
              return <div key = {message.id} className="message system">
                                  {message.content}
                                </div>;
          }
        })}
      </div>
    );
  }
}
export default MessageList;
