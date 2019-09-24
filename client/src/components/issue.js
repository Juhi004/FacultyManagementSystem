import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import style from 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal'
import ModalDialog from 'react-bootstrap/ModalDialog'

class Issue extends Component{

  constructor(props)
  {
    super(props);
  }
  //Render method for the issue
  render()
  {
    return (
      <Row>
      <Modal.Dialog>
      {/*Add id of issue as per state */}
      <Modal.Header closeButton>

        <Modal.Title>Issue</Modal.Title>
      </Modal.Header>

      <Modal.Body>
      <Form>

        <Form.Group as={Row}>
        <Form.Label column md = "4">Department</Form.Label>
        <Col md = "4"><Form.Control plaintext readOnly defaultValue={this.props.details.department}></Form.Control></Col>
        </Form.Group>

        <Form.Group as={Row}>
        <Form.Label column md = "4">Faculty</Form.Label>
        <Col md = "4"><Form.Control plaintext readOnly defaultValue={this.props.details.facultyName}></Form.Control></Col>
        </Form.Group>

        <Form.Group as={Row}>
        <Form.Label column md = "4">Subject</Form.Label>
        <Col md = "4"><Form.Control plaintext readOnly defaultValue={this.props.details.subject}></Form.Control></Col>
        </Form.Group>

        <Form.Group as={Row}>
        <Form.Label column md = "4">Date</Form.Label>
        <Col md = "4"><Form.Control plaintext readOnly defaultValue={this.props.details.date}></Form.Control></Col>
        </Form.Group>

        <Form.Group as={Row}>
        <Form.Label column md = "4">Time</Form.Label>
        <Col md = "4"><Form.Control plaintext readOnly defaultValue={this.props.details.time}></Form.Control></Col>
        </Form.Group>

        <Form.Group as={Row}>
        <Form.Label column md = "4">Remarks</Form.Label>
        <Col md = "8"><Form.Control plaintext readOnly defaultValue={this.props.details.remarks}></Form.Control></Col>
        </Form.Group>

        {/*Change the button color according to the state*/}
        <Form.Group as={Row}>
        <Form.Label column md = "4">Status</Form.Label>
        <Col md = "4"><Button>{this.props.details.status}</Button></Col>
        </Form.Group>

        <Form.Group as={Row}>
        {/*  {this.props.details.position === professor && (status ==""  || status =="" )&& <Button>Submit Reason</Button>}
        {this.props.details.position === professor && (status ==""  || status =="" )&& <Button>Approve Issue</Button>}
        */}
        {/*Add the description and the reason tab too ! and submit button and edit too*/}
        </Form.Group>
      </Form>
      </Modal.Body>

      </Modal.Dialog>
      </Row>
    );
  }

}

export default Issue;
