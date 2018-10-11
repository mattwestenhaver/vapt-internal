import React from 'react'
import { connect } from 'react-redux'
import { clearHistory } from '../../redux/actions/historyActions.jsx'

class Home extends React.Component {

  componentDidMount() {
    this.props.dispatch(clearHistory())
  }

  render() {
    return (
      <div>
        <h1>Home page</h1>
      </div>
    )
  }
}

export default connect(store => {
  return { history: store.history.history }
})(Home)