import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import PollChart from './PollChart'

class Poll extends PureComponent {
  static propTypes = {
    poll: PropTypes.object,
    currentUser: PropTypes.object
  }

  renderAnswer(answer, index, answers) {
    const totalVotes = answers.reduce((curr, next) => { return curr + next.voteCount }, 0)
    const votePerc = (totalVotes === 0) ? 0 : Math.round(answer.voteCount / totalVotes * 100)

    return (
      <li key={ index }>
        { answer.text } ({ answer.voteCount } / { votePerc + '%' })
      </li>
    )
  }

  render() {
    // set initial values because Redux and Router are asynchronous
    // => data might not exist yet
    const initialValues = { question: '', answers: [], createdBy: {} }
    const { poll, currentUserId } = this.props
    const { question, answers, createdBy } = poll || initialValues

    return (
      <div className='poll'>
        <h1>{ question }</h1>
        <p><small>by { createdBy._id === currentUserId ? 'You' : createdBy.name }</small></p>
        <div className='poll-main'>
          <div className='poll-answers'>
            <ul>
              { answers.map(this.renderAnswer) }
              <li><button className='button button-primary'>Vote</button></li>
            </ul>
          </div>
          <PollChart answers={ answers } />
        </div>
        <Link to='/all-polls'>Back to polls list</Link>
      </div>
    )
  }
}

const mapStateToProps = ({ polls , currentUser }, ownProps) => ({
  poll: polls.filter((poll) => { return (ownProps.params.pollId == poll._id) })[0],
  currentUserId: currentUser._id
})


export default connect(mapStateToProps)(Poll)
