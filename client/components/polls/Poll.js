import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { loadCookie } from '../../helpers/session-id'
import addVote from '../../actions/polls/vote'
import PieChart from './PieChart'

class Poll extends PureComponent {
  static propTypes = {
    poll: PropTypes.object,
    currentUser: PropTypes.object
  }

  static defaultProps = {
    poll: { question: '', answers: [], createdBy: {}, voters: [] }
  }

  constructor() {
    super()
    this.state = { answerId: null }
  }

  changeAnswer(event) {
    this.setState({ answerId: event.target.id })
  }

  submitVote(event) {
    event.preventDefault()
    this.props.addVote(this.props.poll._id , this.state.answerId, this.props.poll.answers)
  }

  renderAnswer(answer, index, answers) {
    const totalVotes = answers.reduce((curr, next) => { return curr + next.voteCount }, 0)
    const votePerc = (totalVotes === 0) ? 0 : Math.round(answer.voteCount / totalVotes * 100)

    const classes = (this.state.answerId == answer._id) ? 
      'answer-option answer-active' : 
      'answer-option'

    return (
      <li key={ index } id={ answer._id } className={classes}
        onClick={ this.changeAnswer.bind(this) }>
        <span>
          { answer.text }
        </span>
        <span>
           ({ answer.voteCount } / { votePerc + '%' })
        </span>
      </li>
    )
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
          <div className='poll-answers'>
            { !voted && <ul>
              { answers.map((e, i, a) => this.renderAnswer(e, i, a)) }
              <li>
                <button
                  style={{ marginTop: '10px' }}
                  className='button button-primary'
                  onClick={ this.submitVote.bind(this) }>
                  Vote
                </button>
              </li>
            </ul> }
            { voted && <h3>Thanks for voting!</h3> }
          </div>
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

export default connect(mapStateToProps, { addVote })(Poll)
