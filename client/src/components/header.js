import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import style from 'bootstrap/dist/css/bootstrap.css';

class TopBar extends Component{
  render()
  {
    return (
      <Navbar expand="xl" bg="dark" variant="dark">
        <Navbar.Brand className = 'm-3'>FACULTY MANAGEMENT SYSTEM</Navbar.Brand>
      </Navbar>
    );
  }
}

export default TopBar;
