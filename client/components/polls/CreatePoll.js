import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import savePoll from '../../actions/polls/create'

class CreatePoll extends PureComponent {
  constructor() {
    super()
    this.state = {
      question: '',
      answers: []
    }
  }

  handleKeyUp(event) {
    this.setState({ question: this.refs.question.value })
  }

  addAnswer(event) {
    event.preventDefault()
    this.setState({
      answers: this.state.answers.concat([
        {
          text: this.refs.newanswer.value,
          voteCount: 0
        }
      ])
    })
    this.refs.newanswer.value = ''
  }

  removeAnswer(answer, event) {
    event.preventDefault()
    this.setState({
      answers: this.state.answers.filter((current) => {
        if (current === answer) { return false }
        return true
      })
    })
  }

  savePoll(event) {
    event.preventDefault()
    const { question, answers } = this.state
    const { savePoll, currentUser } = this.props
    savePoll({ question, answers }, currentUser._id)
  }

  renderQuestionInput() {
    return (
      <input type='text' className='input input-question'
        name='question' ref='question' maxLength='80'
        placeholder='Enter your question'
        defaultValue={ this.state.question }
        onKeyUp={ this.handleKeyUp.bind(this) } />
    )
  }

  renderAnswer(answer, index) {
    return (
      <li key={ index }>
        <span className='answer-text'>{ answer.text }</span>
        <span className='button button-error' onClick={ this.removeAnswer.bind(this, answer) }>remove</span>
      </li>
    )
  }

  renderAnswers() {
    const { answers } = this.state
    return (
      <ul className='current-answers'>
        { answers.map(this.renderAnswer.bind(this)) }
      </ul>
    )
  }

  render() {
    return (
      <section className='new-poll'>
        <div className='form-group'>
          { this.renderQuestionInput() }
        </div>
        <form onSubmit={ this.addAnswer.bind(this) }>
          <div className='form-group'>
            { this.renderAnswers() }
            <div className='form-row'>
              <input type='text' className='input input-answer'
                placeholder='Enter an option' maxLength='60'
                name='newanswer' ref='newanswer' />
            </div>
          </div>
        </form>
        <div className='form-group'>
          <button className='button button-primary' onClick={ this.savePoll.bind(this) }>Create</button>
        </div>
      </section>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({ currentUser })
export default connect(mapStateToProps, { savePoll })(CreatePoll)
