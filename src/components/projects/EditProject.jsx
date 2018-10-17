import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import auth from '../../auth.js'

const clients = [
  { key: 0, text: 'Other', value: 'Other' },
  { key: 1, text: 'JLL', value: 'JLL' },
  { key: 2, text: 'Ollie', value: 'Ollie' },
  { key: 3, text: 'Century 21', value: 'Century 21' },
  { key: 4, text: 'Roomrs', value: 'Roomrs'}
]

const clientLeadArr = [
  { key: 0, text: 'Bryan', value: 'Bryan' },
  { key: 1, text: 'Zak', value: 'Zak' }
]

const typeArr = [
  { key: 0, text: 'Other', value: 'Other' },
  { key: 1, text: 'Walkthrough', value: 'Walkthrough' },
  { key: 2, text: 'Guided', value: 'Guided' },
  { key: 3, text: 'Demo', value: 'Demo' },
  { key: 4, text: '2D', value: '2D' },
  { key: 5, text: 'Flythrough', value: 'Flythrough' },
  { key: 6, text: 'Documentary', value: 'Documentary' }
]

const industryArr = [
  { key: 0, text: 'Other', value: 'Other' },
  { key: 1, text: 'Resi Real Estate', value: 'Resi Real Estate' },
  { key: 2, text: 'Entertainment', value: 'Entertainment' },
  { key: 3, text: 'Promotion', value: 'Promotion' },
  { key: 4, text: 'Development', value: 'Development' },
  { key: 5, text: 'Retail', value: 'Retail' },
  { key: 6, text: 'Comm Real Estate', value: 'Comm Real Estate' }
]

const vr2Arr = [
  { key: 0, text: 'Lisa', value: 'Lisa' },
  { key: 1, text: 'Felix', value: 'Felix' },
  { key: 2, text: 'Virgil', value: 'Virgil' }
]

const fusionArr = [
  { key: 0, text: '1', value: '1' },
  { key: 1, text: '2', value: '2' },
  { key: 2, text: '3', value: '3' }
]

class EditProject extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      addYT: false,
      client: props.currentListing.client,
      clientLead: props.currentListing.clientLead,
      type: props.currentListing.type,
      industry: props.currentListing.industry,
      vr2: props.currentListing.vr2,
      fusion: props.currentListing.fusion,
      equipmentIssues: props.currentListing.equipmentIssues,
      youtubeEdits: props.currentListing.youtubeEdits
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  updateProject() {
    const newData = {
      id: this.props.currentListing._id,
      projectName: this.refs.projectName.value,
      client: this.state.client,
      clientLead: this.state.clientLead,
      type: this.state.type,
      industry: this.state.industry,
      filmingDate: this.refs.filmingDate.value,
      producers: this.refs.producers.value.replace(/\s/g, '').split(','),
      vr2: this.state.vr2,
      fusion: this.state.fusion,
      equipmentIssues: this.state.equipmentIssues,
      editors: this.refs.editors.value.replace(/\s/g, '').split(','),
      editStart: this.refs.editStart.value
    }
    auth.updateProject(newData).then(response => {
      if(response) {
        this.props.onClose()
        console.log('update successful')
      } else {
        console.log('update unsuccessful')
      }
    })
  }

  addYoutube(e) {
    e.preventDefault()
    console.log('add yt version')
    this.setState({ addYT: true })
  }

  saveLink(e) {
    e.preventDefault()
    const projectData = {
      id: this.props.currentListing._id,
      youtubeEdits: [
        ...this.state.youtubeEdits,
        {
          link: this.refs.newYoutubeVersion.value
        }
      ]
    }
    auth.updateProject(projectData).then(response => {
      if(response) {
        this.props.onClose()
        console.log('update successful')
      } else {
        console.log('update unsuccessful')
      }
    })
  }

  componentDidMount() {
    this.refs.projectName.value = this.props.currentListing.projectName
    this.refs.filmingDate.value = this.props.currentListing.filmingDate
    this.refs.producers.value = this.props.currentListing.producers.join(', ')
    this.refs.editors.value = this.props.currentListing.editors.join(', ')
    this.refs.editStart.value = this.props.currentListing.editStart
  }
  render() {

    const { client, clientLead, type, industry, vr2, fusion, equipmentIssues } = this.state

    return (
      <div>
        <div className='update-form-wrap'>
          <Form onSubmit={this.updateProject.bind(this)}>
            <Form.Field widths='equal'>
              <label>Project Name</label>
              <input ref='projectName' placeholder='Project Name' />
            </Form.Field>
            <Form.Group widths='equal'>
              <Form.Select fluid label='Client' options={clients} name='client' value={client} placeholder='Select Client' onChange={this.handleChange} />
              <Form.Select fluid label='Client Lead' options={clientLeadArr} placeholder='Select Lead' name='clientLead' value={clientLead} onChange={this.handleChange} />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Select fluid label='Video Type' options={typeArr} placeholder='Select Video Type' name='type' value={type} onChange={this.handleChange} />
              <Form.Select fluid label='Industry' options={industryArr} placeholder='Select Industry' name='industry' value={industry} onChange={this.handleChange} />
            </Form.Group>
            <Form.Field>
              <label>Filming Date</label>
              <input ref='filmingDate' placeholder='Filming Date' />
            </Form.Field>
            <Form.Field>
              <label>Producers</label>
              <input ref='producers' placeholder='Producers (separate names with a comma)' />
            </Form.Field>
            <Form.Group widths='equal'>
              <Form.Select fluid label='VR2' options={vr2Arr} placeholder='Select Robot' name='vr2' value={vr2} onChange={this.handleChange} />
              <Form.Select fluid label='Fusion' options={fusionArr} placeholder='Select Fusion' name='fusion' value={fusion} onChange={this.handleChange} />
            </Form.Group>
            <Form.TextArea label='Equipment Issues' placeholder='Were there any equipment issues during filming?' name='equipmentIssues' value={equipmentIssues} onChange={this.handleChange} />
            <Form.Field>
              <label>Editors</label>
              <input ref='editors' placeholder='Editors (separate names with a comma)' />
            </Form.Field>
            <Form.Field>
              <label>Edit Start Date</label>
              <input ref='editStart' placeholder='Edit Start Date' />
            </Form.Field>
            <label>YouTube Versions</label>
            <ol>
              {this.state.youtubeEdits.map((yt, index) => {
                return (
                  <span key={index}>
                    <li><a href={yt.link} alt={yt.link} target='_blank' rel="noopener noreferrer">{yt.link}</a></li>
                    <ul>
                      {yt.notes.map((note, index2) => {
                        return(<li key={index2}>{note.author}: {note.body}</li>)
                      })}
                    </ul>
                  </span>
                  )
              })}
            </ol>
            {this.state.addYT
              ? <div>
                  <Form.Field>
                    <label>New Version URL</label>
                    <input ref='newYoutubeVersion' placeholder="YouTube URL" />
                  </Form.Field>
                  <Form.Field>
                    <Button size='tiny' onClick={this.saveLink.bind(this)}>Save Link</Button>
                  </Form.Field>
                </div>
              : <Button size='tiny' onClick={this.addYoutube.bind(this)}>Add Version</Button>
            }
            
            <hr />
            <div className='update-button-wrap'>
              <Button fluid>Update Project</Button>
            </div>
          </Form>
        </div>
      </div>
    )
  }
}

export default EditProject