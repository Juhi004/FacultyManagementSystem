import React, {Component} from 'react'
import style from 'bootstrap/dist/css/bootstrap.css';
import TopBar from './header';
import NavBar from './navbar';
import Alert from 'react-bootstrap/Alert';

class Dashboard extends Component{
  state : {};
  constructor(props)
  {
    super(props);
    this.handleApprove = this.handleApprove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleReason = this.handleReason.bind(this);
    this.state = this.props.data;
    this.state.showDangerAlert = false;
    this.state.showSucessAlert = false;
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
      //Only if the database update was sucessfull !
      //TODO: Do we need to insert an alert here ?
      if(xhr.status === 200)
      {
        const issues = this.state.issues.map((item)=>{
          if(item._id !== issue._id)
          return item;
          else {
            item.status = "pending by HOD";
            item.reason = value;
            return item;
          }
        });
        this.setState({'issues':issues,showSucessAlert: true,showDangerAlert: false});
      }else{
        this.setState({showSucessAlert: false,showDangerAlert: true});
      }

    });

    xhr.addEventListener('error', (error) => {
      console.log("error",error);
      this.setState({showDangerAlert : true,showSucessAlert: false});
    })
    xhr.addEventListener('abort', () => {
      console.log("abort");
      this.setState({showDangerAlert : true,showSucessAlert: false});
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

  handleApprove(issue,str,value)
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
      if(xhr.status === 200)
      {
      const issues = this.state.issues.map((item)=>{
        if(item._id !== issue._id)
        return item;
        else {
          if(str === "approve")
          { item.status = "accepted";
            item.reasonByHOD = value;
          return issue;}
          else
          { item.status = "rejected";
            item.reasonByHOD = value;
          return item;}
        }
      });
      this.setState({'issues':issues,showSucessAlert: true, showDangerAlert: false});
    }else{
      this.setState({showDangerAlert : true,showSucessAlert: false});
    }
    })

    xhr.addEventListener('error', (error) => {
      this.setState({showDangerAlert : true,showSucessAlert: false});
      console.log("error",error);
      //TODO : insert a failure message
    })
    xhr.addEventListener('abort', () => {
      this.setState({showDangerAlert : true,showSucessAlert: false});
      console.log("abort");
    })

    // open the request with the verb and the url
  //  xhr.open('GET', 'https://faculty-management-system.herokuapp.com/login')
    xhr.open('POST', '/api/issue');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      _id : issue._id,
      status : str === "approve" ? "accepted" : "rejected",
      reasonByHOD : value
    }));
  }
  render()
  {
    return (
      <React.Fragment>
      {
        this.state.showDangerAlert === true &&
        <Alert variant="danger" onClose={() => this.setState({showDangerAlert:false})} dismissible>
            <Alert.Heading>Error</Alert.Heading>
            Could not perform the action
            Check your internet connection
          </Alert>
        }
        {
          this.state.showSucessAlert === true &&
          <Alert variant="success" onClose={() => this.setState({showSucessAlert:false})} dismissible>
              <Alert.Heading>Sucess</Alert.Heading>
              The changes were made!
            </Alert>
          }

      <TopBar name={this.state.facultyName}/>
      {
        <NavBar details={this.state} handleApprove={(_id,str,value)=>this.handleApprove(_id,str,value)} handleReason={(issue,value)=>this.handleReason(issue,value)} handleEdit={(_id)=>this.handleEdit(_id)}/>
      }
      </React.Fragment>
    );
  }
}

export default Dashboard;
