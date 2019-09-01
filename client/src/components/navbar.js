import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import style from 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';

class NavBar extends Component{
  render()
  {
    return (
      <Navbar expand="xl" bg="dark" variant="dark">
        <Navbar.Brand><Button variant="secondary">My Issues</Button></Navbar.Brand>
        <Navbar.Brand><Button variant="secondary">All Issues</Button></Navbar.Brand>
        <Navbar.Brand><Button variant="secondary">View Department Report</Button></Navbar.Brand>
        <Navbar.Brand><Button variant="secondary">Create a new Issue</Button></Navbar.Brand>
      </Navbar>
    );
  }
}

export default NavBar;
