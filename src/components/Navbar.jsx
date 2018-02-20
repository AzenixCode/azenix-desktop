import '../assets/stylesheets/Navbar.scss';
import '../assets/stylesheets/Sidebar.scss';
import React from 'react';
import logo from '../assets/images/logo/400x400_white1.png';
import Sidebar from 'react-bootstrap-sidebar';
import { Nav, NavItem } from 'react-bootstrap';

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false
    };
  }

  updateModal(isVisible) {
    this.state.isVisible = isVisible;
    this.forceUpdate();
  }

  render() {
    return (
      <div className="navbar">
        <div className="left">
          <button onClick={ () => this.updateModal(true) }><i className="fa fa-bars" /></button>
        </div>
        <div className="middle">
          <img src={logo} />
        </div>
        <div className="right">
          <span>Balance: 100 AZX</span>
        </div>
        <Sidebar side="left" isVisible={ this.state.isVisible } onHide={ () => this.updateModal(false) }>
          <Nav>
            <NavItem href="#">Link 1</NavItem>
            <NavItem href="#">Link 2</NavItem>
            <NavItem href="#">Link 3</NavItem>
            <NavItem href="#">Link 4</NavItem>
          </Nav>
        </Sidebar>
      </div>
    )
  }
}

export default Navbar;
