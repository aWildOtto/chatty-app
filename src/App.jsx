import React, {Component} from 'react';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
  }
    // in App.jsx
  componentDidMount() {
    console.log("componentDidMount <App />");

    this.ws = new WebSocket("ws://localhost:3001");
    this.ws.onmessage = (message)=>{
      console.log(JSON.parse(message.data));
      const msg = JSON.parse(message.data);
      const messages = this.state.messages.concat(msg);
      this.setState({messages});
    }
    this.ws.onopen = (event) => {
      console.log("connected");
    }
  }

  addNewMessage(bundle){
    const newMessage = {type:"sendMessage", username: bundle.name, content: bundle.content}; 
    const messages = this.state.messages.concat(newMessage);
    this.ws.send(JSON.stringify(newMessage));
  }


 

  render() {
    console.log('Rendering <App />');
    return (
      <div>
      <NavBar />
      <MessageList messages = {this.state.messages}/>
      <div className="message system">
        Anonymous1 changed their name to nomnom.
      </div>
      <ChatBar addNewMessage = {this.addNewMessage.bind(this)} currentUser = {this.state.currentUser} />
      </div>
      
    );
  }
}


export default App;
