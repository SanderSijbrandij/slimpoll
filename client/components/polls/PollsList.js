import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class PollsList extends PureComponent {
  static propTypes = {
    polls: PropTypes.array.isRequired
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
      <li className='poll-index' key={ index }>
        <Link to={ location }>{ poll.question }</Link>
        <span>
          { poll.answers.reduce((curr, next) => { return curr + next.voteCount }, 0) } votes
        </span>
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
export default connect(mapStateToProps)(PollsList)
