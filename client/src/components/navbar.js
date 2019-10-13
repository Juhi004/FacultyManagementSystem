import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import style from 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Issues from './issues';
import NewIssue from './newIssue';
import Report from './report';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';

class NavBar extends Component{
  //What if I load the data here ?
  state = {
    DPRVisible : false,
    AllVisible : false,
    MyVisible : true,
    NewIssueVisible : false,
    hasDataList : false,
    hasDPR : false,
    showListAlert : false,
    showReportAlert : false,
    hasListOfDepartments: false,
    showSucessAlert: false,
    showDangerAlert : false
};

  getDepartmentList()
  {
    // create a new XMLHttpRequest
    var xhr = new XMLHttpRequest();
    // get a callback when the server responds
    xhr.addEventListener('load', () => {
      // update the state of the component with the result here
      //console.log(xhr.responseText);
      if(xhr.status === 200)
      {
        this.setState({ListOfDepartments : JSON.parse(xhr.responseText).ListOfDepartments,hasListOfDepartments : true});
      }
      else {
        this.setState({showListAlert : true});
      }
      //TODO : if sucessfull, update the state here and set hasDataList to true

      //Only if the database update was sucessfull !
      //TODO: Do we need to insert an alert here ?
    });

    xhr.addEventListener('error', (error) => {
      this.setState({showListAlert : true});
      console.log("error",error);
      //TODO : insert a failure message
    })
    xhr.addEventListener('abort', () => {
      this.setState({showListAlert : true});
      console.log("abort");
    })
    // open the request with the verb and the url
    xhr.open('GET', '/api/issueDeptList');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
  }

  getDPR()
  {
    //send a request to db to get data
    // @TODO: Do we need to add extra checking to check the username and password combo too?
    // create a new XMLHttpRequest
    var xhr = new XMLHttpRequest();
    // get a callback when the server responds
    xhr.addEventListener('load', () => {
      // update the state of the component with the result here
      if(xhr.status === 200)
      this.setState({dprData : JSON.parse(xhr.responseText).dprData ,hasDPR : true});
      else
      this.setState({showReportAlert: true});
      //TODO : if sucessfull, update the state here and set hasDPR to true

      //Only if the database update was sucessfull !
      //TODO: Do we need to insert an alert here ?
    });

    xhr.addEventListener('error', (error) => {
      this.setState({showReportAlert: true});
      console.log("error",error);
      //TODO : insert a failure message
    })
    xhr.addEventListener('abort', () => {
      this.setState({showReportAlert: true});
      console.log("abort");
    })
    // open the request with the verb and the url
    xhr.open('GET', '/api/issueDPR');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('position',this.props.details.position);
    xhr.setRequestHeader('department',this.props.details.department);
    xhr.send();
  }

  getDataList()
  {
    //send a request to db to get data
    // @TODO: Do we need to add extra checking to check the username and password combo too?
    // create a new XMLHttpRequest
    var xhr = new XMLHttpRequest();
    // get a callback when the server responds
    xhr.addEventListener('load', () => {
      // update the state of the component with the result here
      //console.log(xhr.responseText);
      if(xhr.status === 200)
      this.setState({departmentWiseFaculty : JSON.parse(xhr.responseText).departmentWiseFaculty ,hasDataList : true});
      else
      this.setState({showListAlert:true});
      //TODO : if sucessfull, update the state here and set hasDataList to true

      //Only if the database update was sucessfull !
      //TODO: Do we need to insert an alert here ?
    });

    xhr.addEventListener('error', (error) => {
      this.setState({showListAlert:true});
      console.log("error",error);
      //TODO : insert a failure message
    })
    xhr.addEventListener('abort', () => {
      this.setState({showListAlert:true});
      console.log("abort");
    })
    // open the request with the verb and the url
    xhr.open('GET', '/api/issueDataList');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
  }

  constructor(props)
  {
    super(props);
    this.handleMyIssues = this.handleMyIssues.bind(this);
    this.handleAllIssues = this.handleAllIssues.bind(this);
    this.handleDPR = this.handleDPR.bind(this);
    this.handleNewIssues = this.handleNewIssues.bind(this);
    this.closeNewIssue = this.closeNewIssue.bind(this);
    this.getDataList = this.getDataList.bind(this);
    this.getDepartmentList = this.getDepartmentList.bind(this);
    this.state = {
      DPRVisible : false,
      AllVisible : false,
      MyVisible : true,
      NewIssueVisible : false,
      hasDataList : false,
      hasDPR : false
    }
    this.getDataList();
    this.getDPR();
    this.getDepartmentList();
  }
  closeNewIssue(str,target)
  {
    if(str==="close" || (target.nodeName==="SPAN" || target.nodeName==="BUTTON" ))
    {
      this.setState({NewIssueVisible:false});
      if(target==="success")
      {
        this.setState({showDangerAlert: false, showSucessAlert: true,MyVisible : true});
      }else{
        this.setState({showDangerAlert: true, showSucessAlert: false,MyVisible : true});
      }
    }
  }
  handleMyIssues(){
    this.setState({DPRVisible : false,AllVisible : false, NewIssueVisible :false, MyVisible :true});
  }
  handleAllIssues(){
    this.setState({DPRVisible : false, MyVisible : false, NewIssueVisible :false, AllVisible : true });
  }
  handleDPR(){
    this.setState({AllVisible : false, MyVisible : false, NewIssueVisible :false, DPRVisible : true });
  }
  handleNewIssues(){
    this.setState({DPRVisible : false,AllVisible : false, MyVisible : false, NewIssueVisible : true });
  }

  render()
  {
    return (
      <React.Fragment>
      {
        this.state.showListAlert === true &&
        <Alert variant="danger" onClose={() => this.setState({showListAlert:false})} dismissible>
            <Alert.Heading>Error</Alert.Heading>
            Could not download the list of departments
            Please Check your internet connection
          </Alert>
        }
        {
          this.state.showReportAlert === true &&
          <Alert variant="danger" onClose={() => this.setState({showReportAlert:false})} dismissible>
              <Alert.Heading>Error</Alert.Heading>
              Could not download the department report
              Please Check your internet connection
            </Alert>
          }
        {
          this.state.showDangerAlert === true &&
          <Alert variant="danger" onClose={() => this.setState({showDangerAlert:false})} dismissible>
              <Alert.Heading>Error</Alert.Heading>
              Could not create the issue !
              Check your internet connection
            </Alert>
        }
        {
          this.state.showSucessAlert === true &&
          <Alert variant="success" onClose={() => this.setState({showSucessAlert:false})} dismissible>
              <Alert.Heading>Sucess</Alert.Heading>
              Issue created !
            </Alert>
        }

      <Navbar expand="xl" bg="dark" variant="dark" className='mt-3'>
        <Navbar.Brand><Button variant="secondary" onClick = {this.handleMyIssues}>My Issues</Button></Navbar.Brand>
        {/*Only HOD and Dean can see All issues*/}
        {
          this.props.details.position != "professor" &&
          <Navbar.Brand><Button variant="secondary" onClick = {this.handleAllIssues}>All Issues</Button></Navbar.Brand>
        }
        {/*Only HOD and Dean can see DPR*/}
        {
          //TODO : Edit so that sir can see all of the pie charts,
          //but the HOD can see only her/his departments
        this.props.details.position != "professor" &&
        <Navbar.Brand><Button variant="secondary" onClick = {this.handleDPR}>View Department Report</Button></Navbar.Brand>
        }
        {/*Only Dean can create an issue*/}
        {
        this.props.details.position === "DEAN" &&
        <Navbar.Brand><Button variant="secondary" onClick = {this.handleNewIssues}>Create a new Issue</Button></Navbar.Brand>
        }
      </Navbar>
      {(this.state.DPRVisible && this.state.hasDPR && this.state.hasListOfDepartments) ? <Report dprData = {this.state.dprData} position={this.props.details.position} ListOfDepartments={this.state.ListOfDepartments}/> : null}
      {this.state.AllVisible ? <Issues className='m-2' data={this.props.details} handleApprove={(_id,str,value)=>this.props.handleApprove(_id,str,value)} handleEdit={(_id)=>this.props.handleEdit(_id)} work={"dept"}/> : null}
      {this.state.MyVisible ? <Issues className='m-2' data={this.props.details} work={"my"} handleReason={(issue,value)=>this.props.handleReason(issue,value)} /> : null}
      {(this.state.NewIssueVisible && this.state.hasDataList  && this.state.hasListOfDepartments) ? <NewIssue data = {this.props} departmentWiseFaculty={this.state.departmentWiseFaculty} closeNewIssue={(str,target)=>this.closeNewIssue(str,target)} ListOfDepartments={this.state.ListOfDepartments}/> : null}
      </React.Fragment>
    );
  }
}

export default NavBar;
