import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'

class Poll extends PureComponent {
  static propTypes = {
    poll: PropTypes.object
  }

  render() {
    const { poll } = this.props
    return (
      <div className='poll'>
        <h1>{ !!poll ? poll.question : 'Loading...' }</h1>
      </div>
    )
  }
}

const mapStateToProps = ({ polls }, ownProps) => ({
  poll: polls.filter((poll) => { return (ownProps.params.pollId == poll._id) })[0]
})


export default connect(mapStateToProps)(Poll)
