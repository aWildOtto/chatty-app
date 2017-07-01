import React, {Component} from 'react';

function urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+[.png|.jpg|.gif])/g;
    var matches = text.match(urlRegex);
    let allImgTag = "";
    if(!matches){//if no url in the message, send back the text in a div
      return {__html: `<div>${text}</div>`};
    }
    matches.forEach(function(element) {
      text = text.replace(element, "");  
      allImgTag += `<img class = "chatImage" src="${element}">`;
    });
    let textDiv = `<div>${text}</div>`;//separate text and image
    return {__html: allImgTag + textDiv };
  }

class Message extends Component {
  render() {
    const colorChange = {
      color: this.props.color
    };
    const blockdisplay = {
      display: "block"
    };
    return (
      <div className="message">
        <span style = {colorChange} className="message-username">{this.props.username}</span>
        <span className="message-content">
          <div style = {blockdisplay} dangerouslySetInnerHTML={urlify(this.props.content)} />
        </span>
      </div>
    );
  }
}
export default Message;
