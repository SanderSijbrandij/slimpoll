import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import addVote from '../../actions/polls/vote'

class OptionsList extends PureComponent {
  static propTypes = {
    poll: PropTypes.object.isRequired,
    voted: PropTypes.bool.isRequired
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

    return (
      <li key={ index } id={ answer._id }
        onClick={ this.changeAnswer.bind(this) }>
        <span>
          { answer.text }
        </span>
        <span >
           <span>{ votePerc + '%' }</span>
        </span>
      </li>
    )
  }

  render() {
    const { poll, voted } = this.props
    const { question, answers, createdBy, voters } = poll
    const totalVotes = answers.reduce((curr, next) => {
      return curr + next.voteCount
    }, 0)
    
    return (
      <div >
        <ul>
          { answers.map((e, i, a) => this.renderAnswer(e, i, a)) }
          <li >
            <span>{ totalVotes} vote{ totalVotes !== 1 ? 's' : null }</span>
            { !voted && 
              <button
                style={{ marginTop: '10px' }}
                onClick={ this.submitVote.bind(this) }>
                Vote
              </button>
            }
          </li>
        </ul>
      </div>
    )
  }
}

export default connect(null, { addVote })(OptionsList)