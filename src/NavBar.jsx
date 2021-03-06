
import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <h4 className="userCount">Currently online: {this.props.userCount}</h4>
      </nav>
    );
  }
}
export default NavBar;