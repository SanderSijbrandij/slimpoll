import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadCookie } from '../../helpers/session-id'

import OptionsList from './OptionsList'
import PieChart from './PieChart'

class Poll extends PureComponent {
  static propTypes = {
    poll: PropTypes.object,
    currentUser: PropTypes.object
  }

  static defaultProps = {
    poll: { question: '', answers: [], createdBy: {}, voters: [] }
  }

  renderPieChart(allAnswers) {
    const answers = allAnswers.filter((answer) => {
      return answer.voteCount > 0
    })
    return <PieChart data={answers} />
  }

  render() {
    const { poll, currentUser } = this.props
    const { question, answers, createdBy, voters } = poll
    const totalVotes = answers.reduce((curr, next) => {
      return curr + next.voteCount
    }, 0)
    const sessionId = loadCookie() || null
    const voted = (!!sessionId && voters.indexOf(sessionId) !== -1)

    return (
      <div className='poll'>
        <h1>{ question }</h1>
        <p><small>by { ( !!currentUser && createdBy._id === currentUser._id ) ? 'You' : createdBy.name }</small></p>
        <div className='poll-main'>
          { voted && <h3>Thanks for voting!</h3> }
          { !voted && <OptionsList poll={poll} /> }
          <div className='poll-chart'>
            { totalVotes > 0 && this.renderPieChart(answers) }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ polls , currentUser }, ownProps) => ({
  poll: polls.filter((poll) => { return (ownProps.params.pollId == poll._id) })[0],
  currentUser
})

export default connect(mapStateToProps)(Poll)
