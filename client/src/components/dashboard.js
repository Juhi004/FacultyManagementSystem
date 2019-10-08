import React, {Component} from 'react'
import style from 'bootstrap/dist/css/bootstrap.css';
import TopBar from './header';
import NavBar from './navbar';

class Dashboard extends Component{
  state : {};
  constructor(props)
  {
    super(props);
    this.handleApprove = this.handleApprove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleReason = this.handleReason.bind(this);
    this.state = this.props.data;
  }
  handleEdit(_id)
  {

  }

  handleReason(issue,value)
  {
    //code to request the database // @TODO: Do we need to add extra checking to check the username and password combo too?
    // create a new XMLHttpRequest
    var xhr = new XMLHttpRequest();
    // get a callback when the server responds
    xhr.addEventListener('load', () => {
      // update the state of the component with the result here
      console.log(xhr.responseText);
      //Only if the database update was sucessfull !
      //TODO: Do we need to insert an alert here ?
      const issues = this.state.issues.map((item)=>{
        if(item._id !== issue._id)
        return item;
        else {
          item.status = "pending by HOD";
          item.reason = value;
          return item;
        }
      });
      this.setState({'issues':issues});
    });

    xhr.addEventListener('error', (error) => {
      console.log("error",error);
      //TODO : insert a failure message
    })
    xhr.addEventListener('abort', () => {
      console.log("abort");
    })

    // open the request with the verb and the url
  //  xhr.open('GET', 'https://faculty-management-system.herokuapp.com/login')
    xhr.open('POST', '/api/issueReason');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      _id : issue._id,
      status : "pending by HOD",
      reason : value
    }));
  }

  handleApprove(_id,str)
  {
    //code to request the database // @TODO: Do we need to add extra checking to check the username and password combo too?
    // create a new XMLHttpRequest
    var xhr = new XMLHttpRequest();
    // get a callback when the server responds
    xhr.addEventListener('load', () => {
      // update the state of the component with the result here
      //console.log(xhr.responseText);
      //Only if the database update was sucessfull !
      //TODO: Do we need to insert an alert here ?

      const issues = this.state.issues.map((issue)=>{
        if(issue._id !== _id)
        return issue;
        else {
          if(str === "approve")
          { issue.status = "accepted";
          return issue;}
          else
          { issue.status = "rejected";
          return issue;}
        }
      });
      this.setState({'issues':issues});

    })

    xhr.addEventListener('error', (error) => {
      console.log("error",error);
      //TODO : insert a failure message
    })
    xhr.addEventListener('abort', () => {
      console.log("abort");
    })

    // open the request with the verb and the url
  //  xhr.open('GET', 'https://faculty-management-system.herokuapp.com/login')
    xhr.open('POST', '/api/issue');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      _id : _id,
      status : str === "approve" ? "accepted" : "rejected"
    }));

  }
  render()
  {
    return (
      <React.Fragment>
      <TopBar/>
      {
        <NavBar details={this.state} handleApprove={(_id,str)=>this.handleApprove(_id,str)} handleReason={(issue,value)=>this.handleReason(issue,value)} handleEdit={(_id)=>this.handleEdit(_id)}/>
      }
      </React.Fragment>
    );
  }
}

export default Dashboard;
