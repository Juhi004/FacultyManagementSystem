import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import TopBar from './header';
import Dashboard from './dashboard'
import style from 'bootstrap/dist/css/bootstrap.css';

class LoginForm extends Component {
  constructor()
  {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event)
  {
    event.preventDefault();
    event.stopPropagation();

    //Make an Object here which needs to be sent as a string
    //to the API, to validate the request
    const formData = new FormData(event.target);
    const password = formData.get('password');
    const email = formData.get('email');

    //: Juhi check this if any error

    // create a new XMLHttpRequest
    var xhr = new XMLHttpRequest()
    let responseObject = null;
    // get a callback when the server responds
    xhr.addEventListener('load', () => {
      // update the state of the component with the result here
      responseObject = xhr.responseText;
      console.log(xhr.responseText)
    })

    // open the request with the verb and the url
    xhr.open('GET', 'https://faculty-management-system.herokuapp.com/login')
    //set Query Headers
    xhr.setRequestHeader('password',password);
    xhr.setRequestHeader('email',email);
    // send the request
    xhr.send();

    if(responseObject != null)
    {
      console.log('Login SuccessFul');
      //Now Display the Dashboard
    }else {
      console.log('Login Attempt Failed');
      //Now display the 404 Page
    }
  };

  render()
  {
    return (
  <div>
  <Row><Col md = {12}><TopBar/></Col></Row>
  <Row>
  <Col md={4}></Col>
  <Col md={4}>
  <Form className = 'm-3' onSubmit = {this.handleSubmit}>
    <Form.Group controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" name = "email" placeholder="Enter email" />
    </Form.Group>

    <Form.Group controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" name = "password" placeholder="Password" />
    </Form.Group>

    <Form.Group controlId="formBasicChecbox">
      <Form.Check type="checkbox" label="See password"/>
      </Form.Group>
      <Row>
      <Col md={5}></Col>
      <Col md = {2}>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Col>
    </Row>
  </Form>
  </Col>
  </Row>
  </div>
    );
  }
}

export default LoginForm;
