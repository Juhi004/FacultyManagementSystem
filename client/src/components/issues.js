import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
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
    this.handleEdit = this.handleEdit.bind(this);
    this.handleReason = this.handleReason.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  state={display:false};

  handleEdit(issue)
  {

  }

  handleReason(issue)
  {

  }

  handleApprove(issue)
  {
    console.log(this,issue);
  }

  handleClick(issue)
  {
    this.setState({issue,display:true});
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
       <th>Action</th>
     </tr>
   </thead>
   <tbody>
   {
     this.props.data.issues.map(issue => {
      if((this.props.work === "my" && this.props.data.facultyName === issue.facultyName )|| (this.props.work==="dept" && this.props.data.department === issue.department))
      {
        return (
         <tr onClick={()=>this.handleClick(issue)} key={issue.issueID}>
         <td>{issue.issueID}</td>
         <td>{issue.date}</td>
         <td>{issue.department}</td>
         <td>{issue.facultyName}</td>
         <td>{issue.status}</td>
         {this.props.data.position === "DEAN" && <Button onClick={()=>this.handleEdit(issue)} className = 'm-2'>Edit</Button>}
         {(this.props.work === "dept" && this.props.data.position === "HOD") && <Button onClick={()=>{this.props.handleApprove(issue.issueID)}} className = 'm-2'>Approve/Reject</Button>}
         {(this.props.work === "my" && issue.status != "accepted" ) && <Button onClick={()=>this.handleReason(issue)} className = 'm-2'>Submit Reason</Button>}
         </tr> )
       }
     })
   }

  </tbody>
 </Table>
 </Col>
 </Row>
 {
   this.state.display===true && <Issue details={this.state.issue}/>
 }
 </React.Fragment>
    );
  }

}

export default Issues;
