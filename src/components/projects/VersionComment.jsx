import React from 'react'
import { Form, Button } from 'semantic-ui-react'

class VersionComment extends React.Component {

  constructor(props) {
    super(props) 
    this.state = {
      version: props.version,
      comment: ''
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  postComment() {
    console.log(this.state.comment)
  }

  render() {

    const { version, comment } = this.state

    return (
      <div>
        <h3>Version Link:</h3>
        <a href={version.link} alt={version.link} target='_blank' rel="noopener noreferrer">{version.link}</a>
        <h3>Comments:</h3>
        <div className='comments-container'>
          {version.notes.length > 0
            ? version.notes.map((n,index) => {
                return (
                  <div key={index}>
                    <p>{n.author}: {n.body}</p>
                  </div>
                )
              })
            : <p>There are comments on this version yet.</p>
          }
        </div>
        <Form className='comment-form' onSubmit={this.postComment.bind(this)}>
          <Form.TextArea label='New Comment:' placeholder='Write your comment here' name='comment' value={comment} onChange={this.handleChange} />
          <Form.Field>
            <Button>Post Comment</Button>
          </Form.Field>
        </Form>
      </div>
    )
  }
}

export default VersionComment