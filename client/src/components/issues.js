import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import style from 'bootstrap/dist/css/bootstrap.css';

class Issues extends Component{
  //Render method for the all and my issues
  render()
  {
    return(
  <Row>
  <Col md = {2}></Col>
  <Col md = {8}>
  <Table striped bordered hover>
   <thead>
     <tr>
       <th>ID</th>
       <th>Date</th>
       <th>Department</th>
       <th>Faculty</th>
       <th>Status</th>
     </tr>
   </thead>
   <tbody>
     <tr>
       <td>1</td>
       <td>Mark</td>
       <td>Otto</td>
       <td>@mdo</td>
       <td>@mdo</td>
     </tr>
     <tr>
       <td>1</td>
       <td>Mark</td>
       <td>Otto</td>
       <td>@mdo</td>
       <td>@mdo</td>
     </tr>
     <tr>
       <td>1</td>
       <td>Mark</td>
       <td>Otto</td>
       <td>@mdo</td>
       <td>@mdo</td>
     </tr>
   </tbody>
 </Table>
 </Col>
 </Row>
    );
  }

}

export default Issues;
