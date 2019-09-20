import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
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
    this.state = {
      selfIssues : [23457],
      departmentIssues : [23757,23657],
      facultyName : "Jap Leen" ,
      department : "CSE",
      position : "DEAN",
      issues : [
        {
          issueID : 23457 ,
          subject : "DWDM",
          facultyName : "Jap Leen",
          status : "accepted",
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
          department : "ECE",
          date : "20/10/19",
          time : "9:30",
          remarks : "Not good enough"
        },
        {
          issueID : 23657 ,
          subject : "DCCN",
          facultyName : "Juhi",
          status : "accepted",
          department : "CSE",
          date : "11/09/19",
          time : "10:30",
          remarks : "Not good enough"
        }
      ]
    }
  }
  render()
  {
    return (
      <React.Fragment>
      <TopBar/>
      <NavBar details={this.state} />
      </React.Fragment>
    );
  }
}

export default Dashboard;
