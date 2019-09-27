import React from 'react';
import './App.css';
import LoginForm from './components/login.js';
import TopBar from './components/header.js';
import Dashboard from './components/dashboard.js'

const App = ()=>
(
  <React.Fragment>
    <LoginForm/>
    {/*<Dashboard/>*/}
  </React.Fragment>
);
export default App;
