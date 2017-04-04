import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import savePoll from '../../actions/polls/create'

class CreatePoll extends PureComponent {
  constructor() {
    super()
    this.state = {
      question: '',
      editingQuestion: true,
      answers: []
    }
  }

  handleKeyDown(event) {
    this.setState({ question: this.refs.question.value })
    if (event.key == 'Enter') { this.toggleQuestionEditing() }
  }

  handleBlur(event) {
    this.setState({ question: this.refs.question.value })
    this.toggleQuestionEditing()
  }

  toggleQuestionEditing() {
    this.setState({ editingQuestion: !this.state.editingQuestion })
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
        placeholder="Press enter to save."
        name='question' ref='question' maxLength='80'
        defaultValue={ this.state.question }
        onKeyDown={ this.handleKeyDown.bind(this) }
        onBlur={ this.handleBlur.bind(this) } />
    )
  }

  renderQuestionText() {
    return (
      <span className='text-question' onClick={ this.toggleQuestionEditing.bind(this) }>
        { this.state.question }
      </span>
    )
  }

  renderAnswer(answer, index) {
    return (
      <li key={ index }>
        <span className='answer-text'>{ answer.text }</span>
        <span className='divider'></span>
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
        <h1>New poll</h1>
        <div className='form-group'>
          <h3 onClick={ this.toggleQuestionEditing.bind(this) }>Question <small>(click to edit)</small></h3>
          { this.state.editingQuestion ?
            this.renderQuestionInput() :
            this.renderQuestionText() }
        </div>

        <form onSubmit={ this.addAnswer.bind(this) }>
          <div className='form-group'>
            <h3>Answers</h3>
            { this.renderAnswers() }
            <div className='form-row'>
              <input type='text' className='input input-answer'
                placeholder='Press enter to save.' maxLength='60'
                name='newanswer' ref='newanswer' />
            </div>
          </div>
        </form>
        <div className='form-group'>
          <button className='button button-fullwidth button-primary' onClick={ this.savePoll.bind(this) }>Create</button>
        </div>
      </section>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({ currentUser })
export default connect(mapStateToProps, { savePoll })(CreatePoll)
