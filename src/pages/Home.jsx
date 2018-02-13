import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

class Home extends Component {
  render() {
    return (
      <div>
        <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
          <Tab eventKey={1} title="Transactions">
            Transactions
          </Tab>
          <Tab eventKey={2} title="Send">
            Send
          </Tab>
          <Tab eventKey={3} title="Receive">
            Receive
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Home;
