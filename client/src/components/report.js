import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import {Pie} from 'react-chartjs-2';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import style from 'bootstrap/dist/css/bootstrap.css';

class Report extends Component{
  constructor(props)
  {
      super(props);
      console.log(props);
      this.updateChart = this.updateChart.bind(this);
      this.state = {
        labels : ['accepted','rejected','pending','pending by HOD'],
        datasets :[{
          data : [0,0,0,0] ,
          backgroundColor : ['#28a745','#dc3545','#ffc107','#17a2b8']
        }]
      };
      if(this.props.position === "HOD")
      this.updateChart();
  }
  updateChart()
  {
    if(this.props.position === "HOD")
    {
        let newData = this.state.datasets[0].data;
        const labels = this.state.labels;
        this.props.dprData.map(function(item){
          let itemIndex = labels.indexOf(item._id);
          if(itemIndex > -1)
          newData[itemIndex] = item.count;
      });
      this.setState({datasets : [{data : newData,backgroundColor : this.state.datasets[0].backgroundColor }]})
      // console.log(this.props.dprData);
      // console.log(newData);
    }
    else if(this.props.position === "DEAN")
    {
      const myDepartment = this.department.value;
      if(myDepartment !== undefined && myDepartment !== null){
        const labels = this.state.labels;
        let newData = [0,0,0,0];
        this.props.dprData.map(function(item){
          let itemIndex = labels.indexOf(item._id.status);
          if(itemIndex > -1 && item._id.department === myDepartment)
          newData[itemIndex] = item.count;
      });
      this.setState({datasets : [{data : newData}]})
      console.log(newData);
    }
  }
  }
  render()
  {
    return (
      <React.Fragment>
      {this.props.position === "HOD" && <div>Current Performance of the Department</div> }
      {this.props.position === "DEAN" &&
      <Row>
      <Col md = {2}></Col>
      <Col md = {8}>
      <Form>
      <Form.Group controlId="department">
      <Form.Label>Department</Form.Label>
      <Form.Control ref = {(input) => this.department = input } as="select" onChange={this.updateChart}>
      <option>---Select One---</option>
      {
        this.props.ListOfDepartments.map((combo)=>{
            return <option>{combo.department}</option>
          })
      }
      </Form.Control>
      </Form.Group>
      </Form>
      </Col>
      </Row>
      }
      <Row>
      <Col md = {2}></Col>
      <Col md = {8}>
      <Pie data={{
        labels: this.state.labels,
        datasets : this.state.datasets
                }}
      />
      </Col>
      </Row>
      </React.Fragment>
    );
  }
}

export default Report;
