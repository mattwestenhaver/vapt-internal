import React from 'react'
import auth from '../../auth.js'
import { connect } from 'react-redux'
import { getProjects } from '../../redux/actions/projectActions.jsx'

class Projects extends React.Component {

  getProjects() {
    auth.getProjects().then(response => {
      if(response) {
        this.props.dispatch(getProjects(response))
      } else {
        console.log('error retrieving projects')
      }
    })
  }

  componentDidMount() {
    this.getProjects()
  }

  render() {
    return (
      <div>
        <h1>Projects Index Page</h1>
        <div>
          {this.props.projects.map(p => {
            return (
              <div key={p._id} className="each-project">
                <h2>{p.projectName}</h2>
                <h3>{p.client}</h3>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default connect(store => {
  return { projects: store.projects.projects }
})(Projects)