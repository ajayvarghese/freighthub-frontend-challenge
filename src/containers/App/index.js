import React from 'react';
import styles from './App.css';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Home from './../../pages/Home';
import Shipment from './../../pages/Shipment';

class App extends React.Component {
  render(){
    return (
      <Router>
        <Redirect exact from="/" to="/shipment" />
        <Route path="/shipment" component={Home} />
    </Router>
    )
  }
}

export default App;