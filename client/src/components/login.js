import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import TopBar from './header';
import style from 'bootstrap/dist/css/bootstrap.css';

class LoginForm extends Component{
  render()
  {
    return (
  <div>
  <Row><Col md = {12}><TopBar/></Col></Row>
  <Row>
  <Col md={4}></Col>
  <Col md={4}>
  <Form>
    <Form.Group controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" />
    </Form.Group>

    <Form.Group controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>

    <Form.Group controlId="formBasicChecbox">
      <Form.Check type="checkbox" label="See password"/>
      </Form.Group>

   <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
  </Col>
  </Row>
  </div>
    );
  }
}

export default LoginForm;
