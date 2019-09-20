import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import style from 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Issue from './issue';
import Issues from './issues';
import NewIssue from './newIssue';
import Report from './report';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class NavBar extends Component{
  state = {
  DPRVisible : false,
  AllVisible : false,
  MyVisible : true,
  NewIssueVisible : false
};
  constructor(props)
  {
    super(props);
    this.handleMyIssues = this.handleMyIssues.bind(this);
    this.handleAllIssues = this.handleAllIssues.bind(this);
    this.handleDPR = this.handleDPR.bind(this);
    this.handleNewIssues = this.handleNewIssues.bind(this);
    this.state = {
      DPRVisible : false,
      AllVisible : false,
      MyVisible : true,
      NewIssueVisible : false
    }
  }
  handleMyIssues(){
    this.setState({DPRVisible : false,AllVisible : false, NewIssueVisible :false, MyVisible : !this.state.MyVisible});
  }
  handleAllIssues(){
    this.setState({DPRVisible : false, MyVisible : false, NewIssueVisible :false, AllVisible : !this.state.AllVisible });
  }
  handleDPR(){
    this.setState({AllVisible : false, MyVisible : false, NewIssueVisible :false, DPRVisible : !this.state.DPRVisible });
  }
  handleNewIssues(){
    this.setState({DPRVisible : false,AllVisible : false, MyVisible : false, NewIssueVisible : !this.state.NewIssueVisible });
  }

  render()
  {
    return (
      <React.Fragment>
      <Navbar expand="xl" bg="dark" variant="dark" className='mt-3'>
        <Navbar.Brand><Button variant="secondary" onClick = {this.handleMyIssues}>My Issues</Button></Navbar.Brand>
        {/*Only HOD and Dean can see All issues*/}
        {
          this.props.details.position != "PROFESSOR" &&
          <Navbar.Brand><Button variant="secondary" onClick = {this.handleAllIssues}>All Issues</Button></Navbar.Brand>
        }
        {/*Only HOD and Dean can see DPR*/}
        {
        this.props.details.position != "PROFESSOR" &&
        <Navbar.Brand><Button variant="secondary" onClick = {this.handleDPR}>View Department Report</Button></Navbar.Brand>
        }
        {/*Only Dean can create an issue*/}
        {
        this.props.details.position === "DEAN" &&
        <Navbar.Brand><Button variant="secondary" onClick = {this.handleNewIssues}>Create a new Issue</Button></Navbar.Brand>
        }
      </Navbar>
      <Row>
      {this.state.DPRVisible ? <Report data = {this.props} /> : null}
      {this.state.AllVisible ? <Issues issueIDs = {this.props.details.departmentIssues} listOfIssues = {this.props.details.issues} /> : null}
      {this.state.MyVisible ? <Issues issueIDs = {this.props.details.selfIssues} listOfIssues = {this.props.details.issues} /> : null}
      {this.state.NewIssueVisible ? <NewIssue data = {this.props} /> : null}
      </Row>
      </React.Fragment>
    );
  }
}

export default NavBar;
