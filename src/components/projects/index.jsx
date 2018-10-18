import React from 'react'
import auth from '../../auth.js'
import { connect } from 'react-redux'
import { getProjects } from '../../redux/actions/projectActions.jsx'
import { Accordion, Icon, Modal, Button } from 'semantic-ui-react'

import EditProject from './EditProject.jsx'
import VersionComment from './VersionComment.jsx';

class Projects extends React.Component {

  constructor(props) {
    super(props)
    this.state = { 
      activeIndex: 0,
      editing: false,
      currentListing: null,
      ytVersion: null,
      addComment: false
    }
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  getProjects() {
    auth.getProjects().then(response => {
      if(response) {
        this.props.dispatch(getProjects(response))
      } else {
        console.log('error retrieving projects')
      }
    })
  }

  toggleEdit = (e) => {
    this.setState ({ editing: true, currentListing: e })
  }

  closeEdit = (e) => {
    this.setState({ editing: false })
    this.getProjects()
  }

  openComment = (e) => {
    this.setState({ addComment: true, ytVersion: e })
    console.log(e)
  }

  closeComment = (e) => {
    this.setState({ addComment: false })
    this.getProjects()
  }

  componentDidMount() {
    this.getProjects()
  }

  render() {

    const { activeIndex } = this.state

    return (
      <div>
        <h1>Projects Index Page</h1>
        <div>
          <Accordion>
          {this.props.projects.map(p => {
            return (
              <div key={p._id} className="each-project">
                <Accordion.Title active={activeIndex === p._id} index={p._id} onClick={this.handleClick}>
                  <h2><Icon name='dropdown' />{p.projectName} - {p.client}</h2>
                </Accordion.Title>
                <Accordion.Content active={activeIndex === p._id}>
                  <div className='each-project-1'>
                    <h3>Lead: {p.clientLead}</h3>
                    <h3>Type: {p.type}</h3>
                    <h3>Industry: {p.industry}</h3>
                    <h3>Film Date: {p.filmingDate}</h3>
                    <h3>Edit Start: {p.editStart ? p.editStart : 'N/A'}</h3>
                    <h3>Edit End: {p.editEnd ? p.editEnd : 'N/A'}</h3>
                  </div>

                  <div className='each-project-2'>
                    <h3>Producers:</h3>
                    <ul>
                      {p.producers.map((prod, index) => { return( <li key={index}>{prod}</li> ) })}
                    </ul>
                    <h3>Editors</h3>
                    <ul>
                      {p.editors.length > 0 
                        ? p.editors.map((e, index) => { return( <li key={index}>{e}</li> ) })
                        : <li>No editors have been assigned yet</li>
                      }
                    </ul>
                    <h3>VR2: {p.vr2 ? p.vr2 : 'N/A'}</h3>
                    <h3>Fusion: {p.fusion ? p.fusion : 'N/A'}</h3>
                    <h3>Equipment Issues:</h3>
                    <p>{p.equipmentIssues ? p.equipmentIssues : 'No Equipment Issues'}</p>
                    <h3>YouTube Edits:</h3>
                    <ol>
                      {p.youtubeEdits.map((yt, index) => {
                        return(
                          <span key={index}>
                            <li><Button size='tiny' className='comment-button' onClick={this.openComment.bind(this, yt)}>{yt.link}</Button></li>
                            <ul>
                              {yt.notes.map((note, index2) => {
                                return(<li key={index2}>{note.author}: {note.body}</li>)
                              })}
                            </ul>
                          </span>
                        )
                      })}
                    </ol>
                    <h3>Drive Link: {p.driveFinal ? p.driveFinal : 'N/A'}</h3>
                    <h3>Final Link: {p.urlFinal ? p.urlFinal : 'N/A'}</h3>
                  </div>
                  <Button onClick={this.toggleEdit.bind(this, p)}>Edit Project</Button>
                </Accordion.Content>
              </div>
            )
          })}
          </Accordion>
        </div>

        <Modal className='customModal' open={this.state.addComment} onClose={this.closeComment}>
          <Modal.Header>Post Comment</Modal.Header>
          <Modal.Content scrolling>
            <VersionComment version={this.state.ytVersion} onClose={this.closeComment} />
          </Modal.Content>
        </Modal>

        <Modal className='customModal' open={this.state.editing} onClose={this.closeEdit}>
          <Modal.Header>Update Project</Modal.Header>
          <Modal.Content scrolling>
            <EditProject currentListing={this.state.currentListing} onClose={this.closeEdit} />
          </Modal.Content>
        </Modal>

      </div>
    )
  }
}

export default connect(store => {
  return { projects: store.projects.projects }
})(Projects)