import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';
//import Form from 'react-bootstrap/Form';
//import Button from 'react-bootstrap/Button';
//import Col from 'react-bootstrap/Col';
//import Row from 'react-bootstrap/Row';
import style from 'bootstrap/dist/css/bootstrap.css';

class Report extends Component{
  constructor(props)
  {
      super(props);
      this.state = {
        labels : ['accepted','rejected','pending','pending by HOD'],
        datasets :[{
          data : [2000,23000,43444,3234] ,
          backgroundColor : ['red','blue','green','yellow']
        }]
      };
  }
  render()
  {
    return (
      <div>
      {console.log(this.props.dprData)}
      <Pie data={{labels: this.state.labels,
                  datasets : this.state.datasets
                }}
      />
      </div>
    );
  }
}

export default Report;
