import React from 'react'
import Dropzone from 'react-dropzone'
import { Button } from 'semantic-ui-react'

class Upload extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      files: []
    }
  }

  onDrop(files) {
    console.log(files)
    this.setState({
      files: files
    })
  }

  upload() {
    this.state.files.forEach(f => {
      console.log(f)
    })
  }

  render() {

    return (
      <div className='upload-comp'>
        <h1>Upload Files</h1>
        <div>
          <Dropzone className='dropzone' onDrop={this.onDrop.bind(this)}>
            {this.state.files.length > 0
              ? this.state.files.map(f => {
                  return (
                    <p key={f.name}>{f.name}</p>
                  )
                })
              : "Drop your files here or click to browse your computer"
            }
          </Dropzone>
          <Button onClick={this.upload.bind(this)}>Upload Files</Button>
        </div>
      </div>
    )

  }

}

export default Upload