import React from 'react'
import { Redirect } from 'react-router-dom'

class LogOut extends React.Component {

  componentDidMount() {
    this.props.onLogout()
  }

  render() {
    return (
      <Redirect to='/login' />
    )
  }

}

export default LogOut
