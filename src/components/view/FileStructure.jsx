import React from 'react'
import auth from '../../auth.js'
import { connect } from 'react-redux'

import { goForwards, goBack } from '../../redux/actions/historyActions'

class FileStructure extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      newFolders: [],
      newFiles: []
    }
  }

  loadPath(e) {
    this.props.dispatch(goForwards(e))
    auth.loadPath(e).then(response => {
      if(response.success) {
        console.log(response)
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
        console.log(response)
        this.setState({ newFolders: response.data.CommonPrefixes, newFiles: response.data.Contents })
      } else {
        console.log('error loading AWS')
      }
    })
  }

  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return (
      <div>
        <a onClick={this.loadPrevious.bind(this, this.props.history[this.props.history.length - 2])} href="#">{this.props.history[this.props.history.length - 2]}</a><br /><br />
        {this.state.newFiles.length > 0 || this.state.newFolders.length> 0
          ? <div>
              {this.state.newFolders.map(folder => {
                return (
                  <div key={folder.Prefix}>
                    <a onClick={this.loadPath.bind(this, folder.Prefix)} href="#">{folder.Prefix}</a>
                  </div>
                )
              })}
              {this.state.newFiles.map(file => {
                return (
                  <div key={file.Key}>
                    <a href='#'>{file.Key}</a>
                  </div>
                )
              })}
            </div>
          : <div>
              {this.props.folders.map(folder => {
                return (
                  <div key={folder.Prefix}>
                    <a onClick={this.loadPath.bind(this, folder.Prefix)} href="#">{folder.Prefix}</a>
                  </div>
                )
              })}
              {this.props.files.map(file => {
                return (
                  <div key={file.Key}>
                    <a href="#">{file.Key}</a>
                  </div>
                )
              })}
            </div>
        }
        
      </div>
    )
  }
}

export default connect(store => {
  return { history: store.history.history }
})(FileStructure)