import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import fetchPolls from '../../actions/polls/fetch'

class PollsList extends PureComponent {
  static propTypes = {
    polls: PropTypes.array.isRequired,
    fetchPolls: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.fetchPolls()
  }

  renderNoPolls() {
    return <p>No Polls have been found. Add your own?</p>
  }

  renderPolls() {
    return (
      <ul>{ this.props.polls.map(this.renderPoll) }</ul>
    )
  }

  renderPoll(poll, index) {
    const location = 'poll/' + poll._id
    return (
      <li key={ index }>
        <Link to={ location }>{ poll.question }</Link>
        <br/># of votes: { poll.answers.reduce((curr, next) => {
            return curr + next.voteCount }, 0) }
      </li>
    )
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
