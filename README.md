# Chatty App
A real-time chatting app built in 

Front-end:

React

Back-end:

Node.js, Express.js, WebSocket

Features real-time group chatting, username change notification, image url converts to images, randomly assigned username color 

### Usage

Install the dependencies and start the server in root folder.

Install the dependencies and start the server in chatty-server folder.

```
npm install
npm start
open http://localhost:3000
```
### Screenshots
![1](/screenshots/1.png)

When a user joins the chat, a welcome message shows up for everyone in the chat. username is set to user and it's asked to be set. Current number of user online is always updated on the top right

![2](/screenshots/2.png)

When user changes their username, a notification shows up

![3](/screenshots/3.png)

Every username has a color assigned to them. It will be reassigned once the username changes

![4](/screenshots/4.png)

When a user leaves the chat, a notification also shows

![5](/screenshots/5.png)

user can send an url of any png, jpg or gif and the image will show in the chat. If user also puts text with url, all text will be shown after the image

### Dependencies

* React
* Node
* Webpack
* UUID
* Random color picker
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
