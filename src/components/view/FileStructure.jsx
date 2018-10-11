import React from 'react'
import auth from '../../auth.js'
import { connect } from 'react-redux'
import { Button, Modal, Message } from 'semantic-ui-react'
import { goForwards, goBack } from '../../redux/actions/historyActions'

import FolderUpload from '../upload/FolderUpload.jsx'

import folderIcon from '../../images/folder-icon.png'
import fileIcon from '../../images/file-icon.png'
import openFolder from '../../images/open-folder-icon.png'

class FileStructure extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      newFolders: [],
      newFiles: [],
      upload: false
    }
  }

  loadPath(e) {
    this.props.dispatch(goForwards(e))
    auth.loadPath(e).then(response => {
      if(response.success) {
        // console.log(response)
        this.setState({ newFolders: response.data.CommonPrefixes, newFiles: response.data.Contents })
      } else {
        console.log('error loading AWS')
      }
    })
  }

  loadPrevious(e) {
    this.props.dispatch(goBack(e))
    auth.loadPath(e).then(response => {
      if(response.success) {
        // console.log(response)
        this.setState({ newFolders: response.data.CommonPrefixes, newFiles: response.data.Contents })
      } else {
        console.log('error loading AWS')
      }
    })
  }

  toggleUpload() {
    this.setState ({ upload: !this.state.upload })
  }

  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return (
      !this.props.user
        ? <Message className='login-error' error size='big'
            header='You must be logged in to view and upload files'
          />
        : <div>
            <img src={openFolder} alt='open-folder' className='open-folder' />
            <a onClick={this.loadPrevious.bind(this, this.props.history[this.props.history.length - 2])} href="#" className='open-folder-label'>{this.props.history[this.props.history.length - 2]}</a><br /><br />

            <Button onClick={this.toggleUpload.bind(this)}>Upload Files</Button>
            {/* {this.state.upload
              ? <div className='folder-upload-comp'>
                  <FolderUpload />
                  <Button onClick={this.toggleUpload.bind(this)}>Cancel Upload</Button>
                </div>
              : <Button onClick={this.toggleUpload.bind(this)}>Upload Files</Button>
            } */}
            {this.state.newFiles.length > 0 || this.state.newFolders.length> 0
              ? <div className='aws-file-wrap'>
                  {this.state.newFolders.map(folder => {
                    return (
                      <div key={folder.Prefix}>
                        <img src={folderIcon} alt='folder-icon' className='folder-icon' />
                        <a onClick={this.loadPath.bind(this, folder.Prefix)} href="#">{folder.Prefix}</a>
                      </div>
                    )
                  })}
                  {this.state.newFiles.map(file => {
                    return (
                      <div key={file.Key}>
                        <img src={fileIcon} alt='file-icon' className='file-icon' />
                        <a href='#'>{file.Key}</a>
                      </div>
                    )
                  })}
                </div>
              : <div className='aws-file-wrap'>
                  {this.props.folders.map(folder => {
                    return (
                      <div key={folder.Prefix}>
                        <img src={folderIcon} alt='folder-icon' className='folder-icon' />
                        <a onClick={this.loadPath.bind(this, folder.Prefix)} href="#">{folder.Prefix}</a>
                      </div>
                    )
                  })}
                  {this.props.files.map(file => {
                    return (
                      <div key={file.Key}>
                        <img src={fileIcon} alt='file-icon' className='file-icon' />
                        <a href="#">{file.Key}</a>
                      </div>
                    )
                  })}
                </div>
            }

            <Modal className='customModal' open={this.state.upload} onClose={this.toggleUpload.bind(this)}>
              <Modal.Header>Upload Photos</Modal.Header>
              <Modal.Content >
                <FolderUpload />
              </Modal.Content>
            </Modal>
          </div>
    )
  }
}

export default connect(store => {
  return { history: store.history.history, user: store.user.user }
})(FileStructure)