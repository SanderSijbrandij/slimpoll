import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import CreatePoll from '../polls/CreatePoll'

class Home extends Component {
  static propTypes = {
    signedIn: PropTypes.bool.isRequired
  }

  render() {
    return(
      <div>
        <h1>Welcome to SlimPoll!</h1>
        <p>To create a new poll, please log in. To vote on a poll, please get the correct link from the poll creator.</p>
      </div>
    )
  }
}
const mapStateToProps = ({ currentUser }) => ({ signedIn: !!currentUser })
export default connect(mapStateToProps)(Home)
