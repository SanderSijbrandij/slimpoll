import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'

import fetchPolls from '../../actions/polls/fetch'

class PollsList extends PureComponent {
  componentDidMount() {
    this.props.fetchPolls()
  }

  render() {
    return (
      <p>polls list</p>
    )
  }
}

export default connect(null, { fetchPolls })(PollsList)
