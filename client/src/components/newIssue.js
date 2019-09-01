import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import style from 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal'
import ModalDialog from 'react-bootstrap/ModalDialog'

class NewIssue extends Component{

  //Render method for the issue
  render()
  {
    return (
<Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>New Issue</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
        {/*Select a Department*/}
        <Form.Group controlId="department">
        <Form.Label>Department</Form.Label>
        <Form.Control as="select">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        </Form.Control>
        </Form.Group>

        {/*Select a Faculty*/}
        <Form.Group controlId="faculty">
        <Form.Label>Faculty</Form.Label>
        <Form.Control as="select">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        </Form.Control>
        </Form.Group>

        {/*Enter a Subject*/}
        <Form.Group controlId="subject">
          <Form.Label>Subject</Form.Label>
          <Form.Control placeholder="Enter subject" />
        </Form.Group>

        {/*Enter a Class*/}
        <Form.Group controlId="class">
          <Form.Label>Class</Form.Label>
          <Form.Control placeholder="Enter Class" />
        </Form.Group>

        {/*Enter a Duration*/}
        <Form.Group controlId="Time">
          <Form.Label>Time</Form.Label>
          <Form.Control placeholder="Enter Class Duration" />
        </Form.Group>

        {/*Enter a Date*/}
        <Form.Group controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control placeholder="Enter Date" />
        </Form.Group>

        <Form.Row>
        <Col>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Col>
        <Col>
          <Button variant="primary" type="submit">
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
