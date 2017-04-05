import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import rd3 from 'rd3'

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
    this.setState({ answerId: event.target.value })
  }

  submitVote(event) {
    event.preventDefault()
    this.props.addVote(this.props.poll._id , this.state.answerId)
  }

  renderAnswer(answer, index, answers) {
    const totalVotes = answers.reduce((curr, next) => { return curr + next.voteCount }, 0)
    const votePerc = (totalVotes === 0) ? 0 : Math.round(answer.voteCount / totalVotes * 100)

    return (
      <li key={ index } className='answer-option'>
        <input type='radio' name='answerId' value={ answer._id } id={ answer._id } />
        <label htmlFor={ answer._id }>
          { answer.text } ({ answer.voteCount } / { votePerc + '%' })
        </label>
      </li>
    )
  }

  renderPieChart(answers) {
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
    const initialValues = { question: '', answers: [], createdBy: {} }
    const { poll, currentUserId } = this.props
    const { question, answers, createdBy } = poll || initialValues
    const totalVotes = answers.reduce((curr, next) => {
      return curr + next.voteCount
    }, 0)

    return (
      <div className='poll'>
        <h1>{ question }</h1>
        <p><small>by { createdBy._id === currentUserId ? 'You' : createdBy.name }</small></p>
        <div className='poll-main'>
          <div className='poll-answers'>
            <ul onChange={ this.changeAnswer.bind(this) }>
              { answers.map(this.renderAnswer) }
              <li>
                <button
                  className='button button-primary'
                  onClick={this.submitVote.bind(this)}>
                  Vote
                </button>
                </li>
            </ul>
          </div>
          <div className='poll-chart'>
            { totalVotes > 0 && this.renderPieChart(answers) }
          </div>
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

export default connect(mapStateToProps, { addVote })(Poll)
