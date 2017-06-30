
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
      client.send(data);
    }
  });
};
wss.sendUserCount = ()=>{
  wss.broadcast(JSON.stringify({
    type: "userCount",
    userCount: wss._server._connections
  }));
}
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  console.log(ws);
  wss.sendUserCount();

  if(ws.color){
    ws.color = randomColor();
  }
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    // console.log('Client disconnected');
    wss.sendUserCount();
  });
  ws.on('message', (message)=>{
    
    const msgObj = JSON.parse(message);
    switch (msgObj.type){
      case "sendMessage":
        // console.log("User", msgObj.username, "said", msgObj.content);
        msgObj.id = UUID();
        msgObj.color = ws.color;
        msgObj.type = "incoming message";
        wss.broadcast(JSON.stringify(msgObj));
        break;
      case "usernameChange":
        // console.log(msgObj);
        ws.color = randomColor();
        wss.broadcast(JSON.stringify({
          id: UUID(),
          type: "incoming notification",
          content: msgObj.content
        }));
        break;
      } 
    });
});