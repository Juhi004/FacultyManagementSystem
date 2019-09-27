import React, {Component} from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import style from 'bootstrap/dist/css/bootstrap.css';
import TopBar from './header';
import NavBar from './navbar';

class Dashboard extends Component{
  state : {};
  constructor()
  {
    super();
    this.handleApprove = this.handleApprove.bind(this);
    this.state = {
      facultyName : "Jap Leen" ,
      department : "CSE",
      position : "HOD",
      issues : [
        {
          issueID : 23457 ,
          subject : "DWDM",
          facultyName : "Jap Leen",
          status : "pending",
          department : "CSE",
          date : "09/09/19",
          time : "9:30",
          remarks : "Not good enough"
        },
        {
          issueID : 23757 ,
          subject : "DM",
          facultyName : "Shubhangi",
          status : "pending",
          department : "CSE",
          date : "20/10/19",
          time : "9:30",
          remarks : "Not good enough"
        },
        {
          issueID : 23657 ,
          subject : "DCCN",
          facultyName : "Juhi",
          status : "pending",
          department : "CSE",
          date : "11/09/19",
          time : "10:30",
          remarks : "Not good enough"
        }
      ]
    }
  }
  handleApprove(issueID)
  {
    //Obviously add code here to change the database
    const issues = this.state.issues.map((issue)=>{
      if(issue.issueID !== issueID)
      return issue;
      else {
        issue.status = "accepted";
        return issue;
      }
    });
    this.setState({'issues':issues});
  }
  render()
  {
    return (
      <React.Fragment>
      <TopBar/>
      <NavBar details={this.state} handleApprove={(issueID)=>this.handleApprove(issueID)}/>
      </React.Fragment>
    );
  }
}

export default Dashboard;
