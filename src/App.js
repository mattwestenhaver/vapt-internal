import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navigation from './components/navbar'
import Home from './components/home'
import View from './components/view';
import Upload from './components/upload';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navigation />
          <Route exact path='/' component={Home} />
          <Route path='/view' component={View} />
          <Route path='/upload' component={Upload} />
        </div>
      </Router>
    );
  }
}

export default App;
