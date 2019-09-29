import React, {Component} from 'react'
import style from 'bootstrap/dist/css/bootstrap.css';
import TopBar from './header';
import NavBar from './navbar';

class Dashboard extends Component{
  state : {};
  constructor()
  {
    super();
    this.handleApprove = this.handleApprove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleReason = this.handleReason.bind(this);
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
          issueID : 23957 ,
          subject : "DM",
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
  handleEdit(issueID)
  {

  }
  handleReason(issue,value)
  {
    console.log(issue,value);
    //Obviously add code here to change the database
    const issues = this.state.issues.map((item)=>{
      if(item.issueID !== issue.issueID)
      return item;
      else {
        item.status = "pending by HOD";
        item.reason = value;
        return item;
      }
    });
    this.setState({'issues':issues});
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
      <NavBar details={this.state} handleApprove={(issueID)=>this.handleApprove(issueID)} handleReason={(issue,value)=>this.handleReason(issue,value)} handleEdit={(issueID)=>this.handleEdit(issueID)}/>
      </React.Fragment>
    );
  }
}

export default Dashboard;
