import React from 'react';
import styles from './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './../../pages/Home';

const App = () => (
  <Router>
    <Route path="/" component={Home} />
  </Router>
);

export default App;