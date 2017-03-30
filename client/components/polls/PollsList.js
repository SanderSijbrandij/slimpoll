import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'

import fetchPolls from '../../actions/polls/fetch'

class PollsList extends PureComponent {
  componentDidMount() {
    this.props.fetchPolls()
  }

  renderNoPolls() {
    return <p>No Polls have been found. Add your own?</p>
  }

  renderPolls() {
    return <p>Listing of polls</p>
  }

  render() {
    const { polls } = this.props
    return (
      <section>
        <h1>All Polls</h1>
        { polls.length === 0 ? this.renderNoPolls() : this.renderPolls() }
      </section>
    )
  }
}

const mapStateToProps = ({ polls }) => ({ polls })
export default connect(mapStateToProps, { fetchPolls })(PollsList)
