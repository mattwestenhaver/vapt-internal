import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import auth from '../../auth.js'
import FileStructure from './FileStructure.jsx'

class View extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      folders: [],
      files: [],
      loading: true
    }
  }

  initialLoad() {
    auth.loadAWS().then(response => {
      console.log(response)
      if(response.data.success) {
        console.log('AWS successfully loaded')
        this.setState({ folders: response.data.folders, files: response.data.files, loading: false })
      } else {
        console.log('error loading AWS...')
      }
    })
  }

  componentDidMount() {
    this.initialLoad()
  }

  render() {
    return (
      <div>
        {this.state.loading
          ? <Dimmer active inverted>
              <Loader inverted>Loading AWS...</Loader>
            </Dimmer>
          : <FileStructure folders={this.state.folders} files={this.state.files} />
        }
      </div>
    )
  }
}

export default View