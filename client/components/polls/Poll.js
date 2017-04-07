import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import rd3 from 'rd3'
import { loadCookie } from '../../helpers/session-id'
import addVote from '../../actions/polls/vote'

const PieChart = rd3.PieChart

class Poll extends PureComponent {
  static propTypes = {
    poll: PropTypes.object,
    currentUser: PropTypes.object
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

    const totalVotes = answers.reduce((curr, next) => {
      return curr + next.voteCount
    }, 0)

    const data = answers.map((answer) => {
      return {
        label: answer.text,
        value: Math.round(answer.voteCount/totalVotes * 100)
      }
    })

    return (
      <PieChart
        data={data}
        width={500}
        height={300}
        radius={100}
        innerRadius={0}
        sectorBorderColor='white'
        showInnerLabels={true}
        showOuterLabels={true}
        valueTextFormatter={(val) => `${val}%`}
        colors={d3.scale.category10()}
        colorAccessor={(d, i) => i}
      />
    )
  }

  render() {
    // set initial values because Redux and Router are asynchronous
    // => data might not exist yet
    const initialValues = { question: '', answers: [], createdBy: {}, voters: [] }
    const { poll, currentUser } = this.props
    const { question, answers, createdBy, voters } = poll || initialValues
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
                  className='button button-primary'
                  onClick={this.submitVote.bind(this)}>
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
