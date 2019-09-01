import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import style from 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal'
import ModalDialog from 'react-bootstrap/ModalDialog'

class Issue extends Component{

  //Render method for the issue
  render()
  {
    return (
      <Modal.Dialog>
      {/*Add id of issue as per state */}
      <Modal.Header closeButton>
        <Modal.Title>Issue No #</Modal.Title>
      </Modal.Header>

      <Modal.Body>
      <Form>

        <Form.Group as={Row}>
        <Form.Label column md = "4">Department</Form.Label>
        <Col md = "4"><Form.Control plaintext readOnly defaultValue="CSE"></Form.Control></Col>
        </Form.Group>

        <Form.Group as={Row}>
        <Form.Label column md = "4">Faculty</Form.Label>
        <Col md = "4"><Form.Control plaintext readOnly defaultValue="None"></Form.Control></Col>
        </Form.Group>

        {/*Change the button color according to the state*/}
        <Form.Group as={Row}>
        <Form.Label column md = "4">Status</Form.Label>
        <Col md = "4" variant="primary" ><Button>Assigned</Button></Col>
        </Form.Group>

        {/*Add the description and the reason tab too ! and submit button and edit too*/}
      </Form>
      </Modal.Body>

      </Modal.Dialog>
    );
  }

}

export default Issue;
