import React from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'

class Navigation extends React.Component {

  render() {
    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer to='/'><NavItem eventKey={0}>VirtualAPT</NavItem></LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/view"><NavItem eventKey={1}>View</NavItem></LinkContainer>
            <LinkContainer to="/upload"><NavItem eventKey={2}>Upload</NavItem></LinkContainer>
            <NavDropdown eventKey={3} title="Projects" id="basic-nav-dropdown">
              <LinkContainer to="/projects/all"><MenuItem eventKey={3.1}>View Projects</MenuItem></LinkContainer>
              <LinkContainer to="/projects/new"><MenuItem eventKey={3.2}>Create Project</MenuItem></LinkContainer>
            </NavDropdown>
          </Nav>
          {this.props.user
            ? <Nav pullRight>
                <NavItem eventKey={4}>{this.props.user.firstName}</NavItem>
                <LinkContainer to="/logout"><NavItem eventKey={5}>Logout</NavItem></LinkContainer>
              </Nav>
            : <Nav pullRight>
                <LinkContainer to="/login"><NavItem eventKey={6}>Login</NavItem></LinkContainer>
                <LinkContainer to="/signup"><NavItem eventKey={7}>Sign Up</NavItem></LinkContainer>
              </Nav>
          }
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default connect(store => {
  return { user: store.user.user }
})(Navigation)