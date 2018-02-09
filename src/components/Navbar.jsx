import '../assets/stylesheets/Navbar.scss';
import React, { Component } from 'react';
import logo from '../assets/images/logo/400x400_white1.png';

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="left">
          <button><i className="fa fa-bars" /></button>
        </div>
        <div className="middle">
          <img src={logo} />
        </div>
        <div className="right">
          <span>Balance: 100 AZX</span>
        </div>
      </div>
    );
  }
}

export default Navbar;
