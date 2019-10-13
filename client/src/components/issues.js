import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import style from 'bootstrap/dist/css/bootstrap.css';
import Issue from './issue.js';
import Modal from 'react-bootstrap/Modal'
import ModalDialog from 'react-bootstrap/ModalDialog'

class Issues extends Component{
  //Render method for the all and my issues
  constructor(props)
  {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleReason = this.handleReason.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.submitReason = this.submitReason.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleReasonbyHOD = this.handleReasonbyHOD.bind(this);
    this.submitReasonbyHOD = this.submitReasonbyHOD.bind(this);
  }
  state={display:false,displayReason:false,displayHODReason:false};

  componentDidUpdate()
  {
    if(this.state.displayReason && document.getElementById("displayReason") !== null && document.getElementById("displayReason") !== undefined)
    {
      const height = document.getElementsByTagName("body")[0].clientHeight;
      document.getElementById("displayReason").scrollIntoView();
      const myElement = document.getElementById("displayReason");
      myElement.style.height = (height*1.7).toString() +"px";
    }
    if(this.state.displayHODReason && document.getElementById("HODReason") !== null && document.getElementById("HODReason") !== undefined)
    {
      const height = document.getElementsByTagName("body")[0].clientHeight;
      document.getElementById("HODReason").scrollIntoView();
      const myElement = document.getElementById("HODReason");
      myElement.style.height = (height*1.7).toString() +"px";
    }
  }
  closeModal(target,str)
  {
    if((target.nodeName==="SPAN" || target.nodeName==="BUTTON" ) )
    {
      if(str==="ISSUE")
      this.setState({display:false});
      else if(str==="REASON")
      this.setState({displayReason:false});
      else
      this.setState({displayHODReason:false});
    }
  }
  handleEdit(issue)
  {

  }

  handleReason(issue)
  {
    this.setState({issue,displayReason: true,display:false});
  }
  submitReason(issue,value)
  {
    this.setState({displayReason: false})
    this.props.handleReason(issue,value);
  }
  handleReasonbyHOD(issue,str)
  {
     this.setState({issue,displayHODReason :true,reasonStr : str});
  }
  submitReasonbyHOD(issue,value)
  {
    this.setState({displayHODReason : false})
    this.props.handleApprove(issue,this.state.reasonStr,value)
  }
  handleClick(issue,target)
  {
    if(target.nodeName !== "BUTTON")
    {
      this.setState({issue,display:true,displayReason:false});
    }
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
       <th>Date</th>
       <th>Department</th>
       <th>Faculty</th>
       <th>Status</th>
       {
        ( this.props.data.position !== "DEAN" || this.props.work === "my" ) &&
         <th>Action</th>
       }
     </tr>
   </thead>
   <tbody>
   {
     this.props.data.issues.map(issue => {
      if((this.props.work === "my" && this.props.data.facultyName === issue.facultyName )|| (this.props.work==="dept" && (this.props.data.department === issue.department || this.props.data.position === "DEAN")))
      {
        return (
         <tr onClick={(e)=>{this.handleClick(issue,e.target)}} key={issue._id}>
         <td>{issue.date}</td>
         <td>{issue.department}</td>
         <td>{issue.facultyName}</td>
         <td>
         {issue.status === "accepted" && <Button variant="success">{issue.status}</Button>}
         {issue.status === "rejected" && <Button variant="danger">{issue.status}</Button>}
         {issue.status === "pending by HOD" && <Button variant="info">{issue.status}</Button>}
         {issue.status === "pending" && <Button variant="warning">{issue.status}</Button>}
                 </td>
         {
           /*this.props.data.position === "DEA" && <Button onClick={()=>this.props.handleEdit(issue)} className = 'm-2'>Edit</Button>*/
           /*This might be removed*/
           /*definitely removed :-P */
          /* onClick={()=>{this.props.handleApprove(issue._id,"approve")}}
           onClick={()=>{this.props.handleApprove(issue._id,"reject")}}*/
         }
         {(this.props.work === "dept" && this.props.data.position === "HOD" && issue.status === "pending by HOD") && <Button variant="success" onClick={()=>{this.handleReasonbyHOD(issue,"approve")}} className = 'm-2'>Approve</Button>}
         {(this.props.work === "dept" && this.props.data.position === "HOD" && issue.status === "pending by HOD") && <Button variant="danger" onClick={()=>{this.handleReasonbyHOD(issue,"reject")}} className = 'm-2'>Reject</Button>}
         {(this.props.work === "my" && (issue.status === "pending" || issue.status === "pending by HOD" ) ) && <Button onClick={()=>this.handleReason(issue)} className = 'm-2'>
          {issue.reason === undefined  && <React.Fragment>Submit Reason</React.Fragment>}
          {issue.reason !== undefined && <React.Fragment>Edit Reason</React.Fragment>}
         </Button>}
         </tr> )
       }
     })
   }

  </tbody>
 </Table>
 </Col>
 </Row>
 {
   this.state.display===true && <Issue details={this.state.issue} closeModal={this.closeModal}/>
 }

 {
   this.state.displayReason===true &&
    <div class="addReason rollTheLoader" id = "displayReason">
    <Modal.Dialog>
    <Modal.Header closeButton={true} onClick={(e)=>this.closeModal(e.target,"REASON")}>Reason For Absence!</Modal.Header>
    <Modal.Body>
    <textarea type ="text" rows="5" ref={(input)=>this.reason = input}>{this.state.issue.reason !== undefined && this.state.issue.reason}</textarea><br></br>
    <Button className='m-2' onClick={()=>{this.submitReason(this.state.issue,this.reason.value);}}>Add</Button>
    </Modal.Body>
    </Modal.Dialog>
    </div>
  }
  {
    this.state.displayHODReason===true &&
     <div class="addReason rollTheLoader" id="HODReason">
     <Modal.Dialog>
     <Modal.Header closeButton={true} onClick={(e)=>this.closeModal(e.target,"HODREASON")}>Reason For Approval/Rejection !</Modal.Header>
     <Modal.Body>
     <textarea type ="text" rows="5" ref={(input)=>this.reasonHOD = input}></textarea><br></br>
     <Button className='m-2' onClick={()=>{this.submitReasonbyHOD(this.state.issue,this.reasonHOD.value);}}>Add</Button>
     </Modal.Body>
     </Modal.Dialog>
     </div>
   }
 </React.Fragment>
    );
  }

}

export default Issues;
