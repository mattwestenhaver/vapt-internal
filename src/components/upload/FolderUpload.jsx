import React from 'react'
import Dropzone from 'react-dropzone'
import { Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import S3Client from 'aws-s3';

var config = {
  bucketName: 'videos.virtualapt.com',
  dirName: '',
  region: 'us-east-2',
  accessKeyId: process.env.REACT_APP_VAR_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_VAR_SECRET_KEY
}

class FolderUpload extends React.Component {

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
    if(this.state.files.length === 0) {
      console.log('please choose the files you want to upload') 
    } else {
      this.setState({ loading: true })
      config.dirName = this.props.history[this.props.history.length-1] + this.state.folderName
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
        {/* <h1>Upload New Files</h1> */}
        <div>
          <Form.Input type="text" name="folderName" value={folderName} label={this.props.history[this.props.history.length - 1]} placeholder='Folder Name' onChange={this.handleChange}/>
          <Dropzone className='dropzone-2' onDrop={this.onDrop.bind(this)}>
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
            ? <Form.Field>
                <Button loading>Loading</Button>
              </Form.Field>
            : <Form.Field>
                <Button onClick={this.upload.bind(this)}>Upload Files</Button>
              </Form.Field>
          }
        </div>
      </div>
    )

  }
}

export default connect(store => {
  return { history: store.history.history }
})(FolderUpload)