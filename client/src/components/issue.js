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
      <Row className="singleIssue rollTheLoader">
      <Modal.Dialog>
      {/*Add id of issue as per state */}
      <Modal.Header closeButton onClick={(e)=>this.props.closeModal(e.target,"ISSUE")}>
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

        {(this.props.details.reason !== undefined) && <Form.Group as={Row}>
        <Form.Label column md = "4">Reason For leave</Form.Label>
        <Col md = "8"><Form.Control plaintext readOnly defaultValue={this.props.details.reason}></Form.Control></Col>
        </Form.Group>}

        {/*Change the button color according to the state*/}
        <Form.Group as={Row}>
        <Form.Label column md = "4">Status</Form.Label>
        <Col md = "4">
        {
          this.props.details.status === "accepted" && <Button variant="success">{this.props.details.status}</Button>
        }
        {
          this.props.details.status === "rejected" && <Button variant="danger">{this.props.details.status}</Button>
        }
        {
          this.props.details.status === "pending by HOD" && <Button variant="info">{this.props.details.status}</Button>
        }
        {
          this.props.details.status === "pending" && <Button variant="warning">{this.props.details.status}</Button>
        }
        </Col>
        </Form.Group>

        <Form.Group as={Row}>
        </Form.Group>
      </Form>
      </Modal.Body>

      </Modal.Dialog>
      </Row>
    );
  }

}

export default Issue;
