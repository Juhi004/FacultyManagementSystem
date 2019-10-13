import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import style from 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

class TopBar extends Component{
  state = {};
  constructor(props)
  {
    super(props);
    this.state = {
      displayPassword : false
    }
    this.state.showDangerAlert = false;
    this.state.showSucessAlert = false;
    this.changePassword = this.changePassword.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closePass = this.closePass.bind(this);
  }
  closePass()
  {
    this.setState({displayPassword : false});
  }
  showModal()
  {
    this.setState({displayPassword: true});
  }
  changePassword()
  {
    this.setState({displayPassword : false});
    //send a request to db to get data
    // create a new XMLHttpRequest
    var xhr = new XMLHttpRequest();
    // get a callback when the server responds
    xhr.addEventListener('load', () => {

      //TODO : if sucessfull, update the state here and set hasDPR to true
      //Only if the database update was sucessfull !
      //TODO: Do we need to insert an alert here ?
      if(xhr.status === 200)
      {
        this.setState({showDangerAlert : false,showSucessAlert: true})
      }else{
        this.setState({showDangerAlert : true,showSucessAlert: false})
      }
    });

    xhr.addEventListener('error', (error) => {
      console.log("error",error);
      //TODO : insert a failure message
    })
    xhr.addEventListener('abort', () => {
      console.log("abort");
    })
    // open the request with the verb and the url
    xhr.open('GET', '/api/changePassword');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('username',this.props.name);
    xhr.setRequestHeader('password',this.password.value);
    xhr.setRequestHeader('newPassword',this.newPassword.value);
    xhr.send();

  }
  render()
  {
    return (
      <React.Fragment>
      <Navbar expand="xl" bg="dark" variant="dark">
        <Navbar.Brand className = 'm-3'>FACULTY MANAGEMENT SYSTEM</Navbar.Brand>
        {this.props.name !== undefined && <Navbar.Brand className = 'm-3'>{this.props.name}</Navbar.Brand>}
        {this.props.name !== undefined && <Button onClick={this.showModal}>Reset Password</Button>}
      </Navbar>
      {
        this.state.showDangerAlert === true &&
        <Alert variant="danger" onClose={() => this.setState({showDangerAlert:false})} dismissible>
            <Alert.Heading>Error</Alert.Heading>
            Could not reset password
          </Alert>
        }
        {
          this.state.showSucessAlert === true &&
          <Alert variant="success" onClose={() => this.setState({showSucessAlert:false})} dismissible>
              <Alert.Heading>Sucess</Alert.Heading>
              Password has been reset
            </Alert>
          }

      {
        this.state.displayPassword &&
         <div class="addReason rollTheLoader">
         <Modal.Dialog>
         <Modal.Header closeButton={true} onClick={(e)=>this.closePass()}>Change Password</Modal.Header>
         <Modal.Body>

         <Form.Group controlId="password">
           <Form.Label>Old Password</Form.Label>
           <Form.Control ref = {(input) => this.password = input } placeholder="Enter your old password" />
         </Form.Group>

         <Form.Group controlId="newPassword">
           <Form.Label>New Password</Form.Label>
           <Form.Control ref = {(input) => this.newPassword = input } placeholder="Enter your new password" />
         </Form.Group>

         <Button className='m-2' onClick={()=>{this.changePassword()}}>Change</Button>
         </Modal.Body>
         </Modal.Dialog>
         </div>
       }
       </React.Fragment>
    );
  }
}

export default TopBar;
