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

  setQuestionText(event) {
    this.setState({ question: this.refs.question.value })
    if (event.key == 'Enter') { this.toggleQuestionEditing() }
  }

  toggleQuestionEditing() {
    this.setState({ editingQuestion: !this.state.editingQuestion })
  }

  addAnswer(event) {
    event.preventDefault()
    this.setState({
      answers: this.state.answers.concat([
        {
          answerText: this.refs.newanswer.value,
          count: 0
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
    if (question === '' || answers.length < 2) {
      // Add validations to the form for this
    } else {
      savePoll({ question, answers }, currentUser._id)
    }
  }

  renderQuestionInput() {
    return (
      <input type='text' className='input-question'
        placeholder="Don't be shy, ask a question!"
        name='question' ref='question'
        defaultValue={ this.state.question }
        onKeyDown={ this.setQuestionText.bind(this) } />
    )
  }

  renderQuestionText() {
    return (
      <span onClick={ this.toggleQuestionEditing.bind(this) }>
        { this.state.question }
      </span>
    )
  }

  renderAnswer(answer, index) {
    return (
      <li key={ index }>
        <span>{ answer.answerText }</span>
        &nbsp; > <a href='#' onClick={ this.removeAnswer.bind(this, answer) }>remove</a>
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
      <section>
        <h1>Make a new poll</h1>
        <div className='form-group'>
          <h2>Question</h2>
          { this.state.editingQuestion ?
            this.renderQuestionInput() :
            this.renderQuestionText() }
        </div>

        <form onSubmit={ this.addAnswer.bind(this) }>
          <div className='form-group'>
            <h2>Answers</h2>
            { this.renderAnswers() }
            <br />
            <input type='text' className='input-answer'
              placeholder='Add an Option'
              name='newanswer'
              ref='newanswer' />
            <input type='submit' value='Add' className='add-answer' />
          </div>
        </form>

        <button onClick={ this.savePoll.bind(this) }>Create</button>
      </section>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({ currentUser })
export default connect(mapStateToProps, { savePoll })(CreatePoll)
