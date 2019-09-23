import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import style from 'bootstrap/dist/css/bootstrap.css';
import Issue from './issue.js';

class Issues extends Component{
  //Render method for the all and my issues
  constructor(props)
  {
    super(props);
  }
  state={display:false}
  handleClick(issue)
  {

  }

  render()
  {
    return(
  <React.Fragment>
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
   {
     this.props.listOfIssues.map(issue => {
      if(this.props.issueIDs.indexOf(issue.issueID) != -1)
      {
        return (
         <tr onClick={()=>this.handleClick(issue)} key={issue.issueID}>
         <td>{issue.issueID}</td>
         <td>{issue.date}</td>
         <td>{issue.department}</td>
         <td>{issue.facultyName}</td>
         <td>{issue.status}</td>
         </tr> )
       }
     })
   }

  </tbody>
 </Table>
 </Col>
 </Row>
 {
   this.state.display===true
 }
 </React.Fragment>
    );
  }

}

export default Issues;
