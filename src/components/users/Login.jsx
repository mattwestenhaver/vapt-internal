import React from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Button } from 'semantic-ui-react'
import auth from '../../auth.js'
import { connect } from 'react-redux'
import { login } from '../../redux/actions/userActions.jsx'

class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      redirect: false
    }
  }

  login(e) {
    e.preventDefault()
    const userData = {
      email: this.refs.email.value,
      password: this.refs.password.value
    }
    auth.login(userData).then(user => {
      if(user) {
        this.props.dispatch(login(user))
        this.setState({ redirect: true })
      } else {
        console.log('invalid credentials')
      }
    })
  }

  render() {
    return (
      this.state.redirect
        ? <Redirect to='/view' />
        : <div>
            <div className='form-wrap'>
              <h1>Login component</h1>
              <Form onSubmit={this.login.bind(this)}>
                <Form.Field>
                  <label>Email</label>
                  <input ref='email' placeholder='Email' />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <input ref='password' type='password' placeholder='Password' />
                </Form.Field>
                <Button type='submit'>Submit</Button>
              </Form>
            </div>
          </div>
      
    )
  }
}

export default connect(store => {
  return { user: store.user.user }
})(Login)