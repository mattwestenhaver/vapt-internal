import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import auth from './auth'
import { connect } from 'react-redux'
import { logout } from './redux/actions/userActions.jsx'
import Navigation from './components/navbar'
import Home from './components/home'
import View from './components/view';
import Upload from './components/upload';
import Login from './components/users/Login.jsx'
import Logout from './components/users/Logout.jsx'
import Signup from './components/users/Signup.jsx'
import Projects from './components/projects'
import NewProject from './components/projects/NewProject.jsx'

class App extends Component {

  logOut() {
    auth.clearToken()
    this.props.dispatch(logout())
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navigation />
          <Route exact path='/' component={Home} />
          <Route path='/view' component={View} />
          <Route path='/upload' component={Upload} />
          <Switch>
            <Route exact path='/projects/all' component={Projects} />
            <Route path='/projects/new' component={NewProject} />
          </Switch>
          <Route path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
          <Route path='/logout' render={() => (
              <Logout onLogout={this.logOut.bind(this)} />
          )} />
        </div>
      </Router>
    );
  }
}

export default connect(store => {
  return { user: store.user.user }
})(App)
