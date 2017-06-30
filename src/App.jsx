import React, {Component} from 'react';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      userCount: 0,
      currentUser: {
        name: "Anonymous",
      }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
  }
    // in App.jsx
  componentDidMount() {
    console.log("componentDidMount <App />");

    this.ws = new WebSocket("ws://localhost:3001");
    
    this.ws.onmessage = (message)=>{
      const data = JSON.parse(message.data);
      switch(data.type){
        case "userCount":
          console.log("counting user!!!", data.userCount);
          this.setState({userCount: data.userCount});
          console.log("updated usercount", this.state.userCount);
          break;
        case "incoming message":
          const messages = this.state.messages.concat(data);
          console.log(JSON.parse(message.data));
          this.setState({messages});
          break;
        case "incoming notification":
          const newMessages = this.state.messages.concat(data);
          this.setState({messages: newMessages});          
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + data.type);
      }
    };
    this.ws.onopen = (event) => {
      console.log("connected");
    }
  }
  componentDidUpdate() {
    window.scrollTo(0, document.querySelector(".messages").scrollHeight);
  }
  addNewMessage(bundle){
    if(bundle.name !== this.state.currentUser.name){
      this.changeUsername(bundle.name);
    }
    if(bundle.content.length !== 0){
      const newMessage = {type:"sendMessage", username: bundle.name, content: bundle.content}; 
      const messages = this.state.messages.concat(newMessage);
      this.ws.send(JSON.stringify(newMessage));
    }
  }


  changeUsername(newUsername){
    console.log("something");
    if(newUsername !== this.state.currentUser.name){
      const userNameMsg = {type:"usernameChange", content: `${this.state.currentUser.name} has changed their name to ${newUsername}`}
      this.setState({currentUser:{
          name: newUsername
        } 
      });
        
      this.ws.send(JSON.stringify(userNameMsg));
    }
  }

  render() {
    console.log('Rendering <App />');
    return (
      <div>
        <NavBar userCount = {this.state.userCount}/>
        <MessageList color = {this.state.currentUser.color} messages = {this.state.messages}/>
        
        <ChatBar changeUsername = {this.changeUsername.bind(this)} addNewMessage = {this.addNewMessage.bind(this)} currentUser = {this.state.currentUser} />
      </div>
      
    );
  }
}


export default App;
