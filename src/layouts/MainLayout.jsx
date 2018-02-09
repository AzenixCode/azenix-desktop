import '../assets/css/MainLayout.scss';
import React, { Component, cloneElement } from 'react';

class MainLayout extends Component {
  render() {
    return (
      <div>
        <h1>Hello, Electron!</h1>
        <div className="child-spot">
          { this.props.children &&
            cloneElement(this.props.children, this.props.children.props) }
        </div>
      </div>
    );
  }
}

export default MainLayout;
