import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import CreatePoll from '../polls/CreatePoll'

class Home extends Component {
  render() {
    return(
      <div>
        <h1>Welcome to SlimPoll!</h1>
        <p>To create a new poll, please log in. To vote on a poll, please get the correct link from the poll creator.</p>
      </div>
    )
  }
}

export default Home
