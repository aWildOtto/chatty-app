import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    console.log('Rendering <ChatBar />');
    console.log(this.props);
    return (
      <div>
        <footer className="chatbar">
          <input className="chatbar-username" placeholder={this.props.currentUser.name} />
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
        </footer>
      </div>
    );
  }
}
export default ChatBar;
