import React from 'react'
import Dropzone from 'react-dropzone'
import { Button, Form } from 'semantic-ui-react'
import S3Client from 'aws-s3';

var config = {
  bucketName: 'videos.virtualapt.com',
  dirName: '',
  region: 'us-east-2',
  accessKeyId: process.env.REACT_APP_VAR_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_VAR_SECRET_KEY
}

class Upload extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      files: [],
      loading: false,
      uploaded: 0,
      folderName: ''
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  onDrop(files) {
    console.log(files)
    this.setState({
      files: files
    })
  }

  upload() {
    if(this.state.folderName === '') {
      console.log('please select a folder name for your project')
    } else if (this.state.files.length === 0) {
      console.log('please choose the files you want to upload') 
    } else {
      this.setState({ loading: true })
      config.dirName = this.state.folderName
      this.state.files.forEach(f => {
        S3Client.uploadFile(f, config)
          .then((data) => {
            console.log(data)
            this.setState({ uploaded: this.state.uploaded + 1 })
            if(this.state.files.length === this.state.uploaded) {
              this.setState({ loading: false })
            }
          })
          .catch((err) => {
            console.log(err)
          })
      })
    }
  }

  render() {

    const { folderName } = this.state

    return (
      <div className='upload-comp'>
        <h1>Upload Files</h1>
        <div>
          <Form.Field>
            <Form.Input type="text" name="folderName" value={folderName} placeholder="Folder Name" onChange={this.handleChange}/>
          </Form.Field>
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
          {this.state.loading
            ? <Button loading>Loading</Button>
            : <Button onClick={this.upload.bind(this)}>Upload Files</Button>
          }
        </div>
      </div>
    )

  }

}

export default Upload