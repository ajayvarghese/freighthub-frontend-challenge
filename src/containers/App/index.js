import React from 'react';
import styles from './App.css';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Home from './../../pages/Home';

class App extends React.Component {
  render(){
    return (
      <Router>
        <Route path="/" component={Home} />
      </Router>
    )
  }
}

export default App;