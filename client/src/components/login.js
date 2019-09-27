import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import TopBar from './header';
import Dashboard from './dashboard'
import style from 'bootstrap/dist/css/bootstrap.css';

class LoginForm extends Component {
  state = {
    showDashboard : true,
    showLoginForm : false,
    data : {}
  }
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

    // create a new XMLHttpRequest
    var xhr = new XMLHttpRequest();
    let responseObject = null;
    // get a callback when the server responds
    xhr.addEventListener('load', () => {
      // update the state of the component with the result here
      responseObject = xhr.responseText;
      if(JSON.parse(xhr.responseText).username !== undefined)
      this.setState({showDashboard: true,showLoginForm: false,data : responseObject});
    })
    xhr.addEventListener('error', (error) => {
      console.log("error",error);
    })
    xhr.addEventListener('abort', () => {
      console.log("abort");
    })

    // open the request with the verb and the url
  //  xhr.open('GET', 'https://faculty-management-system.herokuapp.com/login')
    xhr.open('GET', '/login');
    //set Query Headers
    xhr.setRequestHeader('password',password);
    xhr.setRequestHeader('email',email);
    // send the request
    xhr.send();
};

  render()
  {
    return (
  <div>
  {this.state.showDashboard && <Dashboard/>}
  {this.state.showLoginForm &&
    <div><Row><Col md = {12}><TopBar/></Col></Row>
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
  </Row></div>
}
  </div>
    );
  }
}

export default LoginForm;
