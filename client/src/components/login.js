import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import TopBar from './header';
import Dashboard from './dashboard';
import style from 'bootstrap/dist/css/bootstrap.css';
import Alert from 'react-bootstrap/Alert';

class LoginForm extends Component {
  state = {
    showDashboard : false,
    showLoginForm : true,
    showLoader : false,
    showAlert : false,
    showPassword : false,
    data : {}
  }
  constructor()
  {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.togglePassword = this.togglePassword.bind(this);
  }
  togglePassword()
  {
    this.setState({showPassword:!this.state.showPassword});
  }
  handleSubmit(event)
  {
    this.setState({showLoader:true});
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
      if(JSON.parse(xhr.responseText).facultyName !== undefined)
      this.setState({showDashboard: true,showLoginForm: false,showLoader:false,showAlert:false,data : JSON.parse(responseObject)});
      else
      this.setState({showLoader:false,showAlert:true});
    })
    xhr.addEventListener('error', (error) => {
      console.log("error",error);
      this.setState({showLoader:false,showAlert:true});
    })
    xhr.addEventListener('abort', () => {
      console.log("abort");
      this.setState({showLoader:false,showAlert:true});
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
  {this.state.showAlert === true &&
    <Alert variant="danger" onClose={() => this.setState({showAlert:false})} dismissible>
        <Alert.Heading>Error</Alert.Heading>
        Username and Password combo may be wrong
      </Alert>
    }
  {this.state.showLoader === true&& <div class="rollTheLoader"><div class="lds-roller">Loading<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>}
  {this.state.showDashboard && <Dashboard data={this.state.data}/>}
  {this.state.showLoginForm &&
    <div><Row><Col md = {12}><TopBar/></Col></Row>
  <Row>
  <Col md={4}></Col>
  <Col md={4}>
  <Form className = 'm-3' onSubmit = {this.handleSubmit}>
    <Form.Group controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" name = "email" placeholder="Enter email" required/>
    </Form.Group>

    <Form.Group controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type={this.state.showPassword === false ? "password" : "text"} name = "password" placeholder="Password" required/>
    </Form.Group>

    <Form.Group controlId="formBasicChecbox">
      <Form.Check type="checkbox" label="Show password" onClick={this.togglePassword}/>
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
