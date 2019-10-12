import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import style from 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal'
import ModalDialog from 'react-bootstrap/ModalDialog'

class NewIssue extends Component{
  state={
    searchTerm : '',
    //do we need to put the departments into a database document too ?
  };
  constructor(props)
  {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  handleSubmit(event){
   event.preventDefault();
   event.stopPropagation();
   const form = event.target;
   if(form === undefined || form === null)
   {
     console.log("Form is not present");
   }else {
     const issue = {
       department : this.department.value,
       facultyName : this.faculty.value,
       subject : this.subject.value,
       class : this.classes.value,
       time : this.time.value,
       date : this.date.value,
       remarks: this.remarks.value,
       status : "pending"
     }

     //send a request to db to check and update and return this with a complete object
     // @TODO: Do we need to add extra checking to check the username and password combo too?
     // create a new XMLHttpRequest
     var xhr = new XMLHttpRequest();
     // get a callback when the server responds
     xhr.addEventListener('load', () => {
       // update the state of the component with the result here
       console.log(xhr.responseText);

       //Only if the database update was sucessfull !
       //TODO: Do we need to insert an alert here ?
       //TODO : do we need to make any changes to the UI, although the success message is a must here
     });

     xhr.addEventListener('error', (error) => {
       console.log("error",error);
       //TODO : insert a failure message
     })
     xhr.addEventListener('abort', () => {
       console.log("abort");
     })

     // open the request with the verb and the url
   //  xhr.open('GET', 'https://faculty-management-system.herokuapp.com/login')
     xhr.open('POST', '/api/issueCreate');
     xhr.setRequestHeader('Content-Type', 'application/json');
     //JSON.stringify(issue)
     xhr.send(JSON.stringify(issue));
   }
 };
 onSearchChange(event)
 {
   this.setState({searchTerm : event.target.value})
 }
  //Render method for the issue
  render()
  {
    return (
<Modal.Dialog>
      <Modal.Header closeButton onClick={(e)=>{this.props.closeNewIssue(e.target)}}>
        <Modal.Title>New Issue</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form onSubmit={this.handleSubmit}>
        {/*Select a Department*/}
        <Form.Group controlId="department">
        <Form.Label>Department</Form.Label>
        <Form.Control ref = {(input) => this.department = input } as="select" onChange={this.onSearchChange}>
        <option>---Select One---</option>
        { this.props.ListOfDepartments.map((department)=>{
            return <option>{department.department}</option>
        })
        }
        </Form.Control>
        </Form.Group>

        {/*Select a Faculty*/}
        <Form.Group controlId="faculty">
        <Form.Label>Faculty</Form.Label>
        <Form.Control ref = {(input) => this.faculty = input } as="select">
        <option>---Select One---</option>
        {
          this.props.departmentWiseFaculty.filter((combo)=>{
            if(combo.department === this.state.searchTerm)
            return combo;
          }).map((combo)=>{
              return <option>{combo.name}</option>
            })
        }
        </Form.Control>
        </Form.Group>

        {/*Enter a Subject*/}
        <Form.Group controlId="subject">
          <Form.Label>Subject</Form.Label>
          <Form.Control ref = {(input) => this.subject = input } placeholder="Enter subject" />
        </Form.Group>

        {/*Enter a Class*/}
        <Form.Group controlId="class">
          <Form.Label>Class</Form.Label>
          <Form.Control ref = {(input) => this.classes = input } placeholder="Enter Class" />
        </Form.Group>

        {/*Enter a Duration*/}
        <Form.Group controlId="Time">
          <Form.Label>Time</Form.Label>
          <Form.Control ref = {(input) => this.time = input } placeholder="Enter Class Duration" />
        </Form.Group>

        {/*Enter a Date*/}
        <Form.Group controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control ref = {(input) => this.date = input } placeholder="Enter Date" />
        </Form.Group>

        <Form.Group controlId="remarks">
          <Form.Label>Remarks</Form.Label>
          <Form.Control ref = {(input) => this.remarks = input } placeholder="Enter Remarks" />
        </Form.Group>

        <Form.Row>
        <Col>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Col>
        <Col>
          <Button variant="primary" type="submit" onClick={(e)=>{this.props.closeNewIssue(e.target)}}>
            Discard
          </Button>
        </Col>
        </Form.Row>
      </Form>
      </Modal.Body>
</Modal.Dialog>
    );
  }

}

export default NewIssue;
