
const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const UUID = require('uuid');
const randomColor = require('randomcolor'); // import the script 
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = (data) => {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};
wss.sendUserCount = () => {
  wss.broadcast({
    type: "userCount",
    userCount
  });
}
wss.sendWelcome = () => {//send a welcome when a new user joins
  wss.broadcast({
    id: UUID(),
    type: "incoming notification",
    content: "A user has joined the chat. Welcome and please set your name"
  })
}

let userCount = 0;
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  userCount ++;
  wss.sendUserCount();
  wss.sendWelcome();
  if(!ws.color){
    ws.color = randomColor();
  }
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log("client disconnected");
    const userName = ws.username? ws.username: "user";
    wss.broadcast({// send a notification when a user leaves
      id: UUID(),
      type: "incoming notification",
      content: `${userName} has left the chat`
    });
    userCount --;
    wss.sendUserCount();
  });
  ws.on('message', (message)=>{
    
    const msgObj = JSON.parse(message);
    switch (msgObj.type){
      case "sendMessage":
        msgObj.id = UUID();
        msgObj.color = ws.color;
        msgObj.type = "incoming message";
        wss.broadcast(msgObj);
        break;
      case "usernameChange":
        ws.color = randomColor();
        ws.username = msgObj.newUsername;
        wss.broadcast({
          id: UUID(),
          type: "incoming notification",
          content: msgObj.content
        });
        break;
      } 
    });
});