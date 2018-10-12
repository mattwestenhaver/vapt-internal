import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import auth from '../../auth';

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

class NewProject extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      client: '',
      clientLead: '',
      type: '',
      industry: '',
      vr2: '',
      fusion: '',
      equipmentIssues: ''
    }
  }
  
  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  createProject() {
    console.log('form submitted')
    const projectData = {
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
    auth.newProject(projectData).then(response => {
      if(response) {
        console.log('project created successfully')
        this.setState({ redirect: true })
      } else {
        console.log('error while creating project')
      }
    })
  }

  render() {

    const { client, clientLead, type, industry, vr2, fusion, equipmentIssues } = this.state

    return (
      this.state.redirect
        ? <Redirect to='/projects/all' />
        : <div className='new-project-container'>
            <h1>Create A Project</h1>
            <div className='form-wrap'>
              <Form onSubmit={this.createProject.bind(this)}>
                <Form.Field>
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
                <Button type='submit'>Submit</Button>
              </Form>
            </div>
          </div>
      
    )
  }
}

export default NewProject