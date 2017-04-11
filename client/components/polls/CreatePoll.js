import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { history } from '../../store'
import { Input, Label, Button, Segment, Divider, List } from 'semantic-ui-react'
import savePoll from '../../actions/polls/create'

class CreatePoll extends PureComponent {
  constructor() {
    super()
    this.state = {
      question: '',
      newanswer: '',
      answers: []
    }
  }

  componentDidMount() {
    if (!this.props.currentUser) { history.push('/sign-in') }
  }

  setQuestion(event) { this.setState({ question: event.target.value })}
  setNewAnswer(event) { this.setState({ newanswer: event.target.value }) }

  addAnswer(event) {
    event.preventDefault()
    this.setState({
      answers: this.state.answers.concat([
        {
          text: this.state.newanswer,
          voteCount: 0
        }
      ]),
      newanswer: ''
    })
    this.refs.newanswer.inputRef.value = ''
  }

  removeAnswer(answer, event) {
    event.preventDefault()
    this.setState({
      answers: this.state.answers.filter((current) => (current !== answer))
    })
  }

  savePoll(event) {
    event.preventDefault()
    const { question, answers } = this.state
    const { savePoll, currentUser } = this.props
    savePoll({ question, answers }, currentUser._id)
  }

  renderAnswer(answer, index) {
    return (
    <List.Item key={ index }>
      { answer.text }
      <List.Content floated='right'>
        <Button negative size='mini'
          onClick={ this.removeAnswer.bind(this, answer) }>
          remove
        </Button>
      </List.Content>
    </List.Item>  
    )
  }

  render() {
    return (
      <Segment basic>
        <Segment>
          <Label size='large' ribbon>Question</Label>
          <Divider hidden />
          <Input fluid placeholder='Name your poll' size='big' transparent
            maxLength='80' ref='question' name='question' autoFocus
            onChange={ this.setQuestion.bind(this) } />
        </Segment>
        
        <Segment>
          <Label size='large' ribbon>Options</Label>
          <Divider hidden />
          
          <List divided size='large' verticalAlign='bottom'>
            { this.state.answers.map(this.renderAnswer.bind(this)) }
          </List>

        <form onSubmit={ this.addAnswer.bind(this) }>
          <Input placeholder='Add an option'
            maxLength='60' ref='newanswer' name='newanswer' 
            onChange={ this.setNewAnswer.bind(this) } />
        </form>
        </Segment>

        <Button floated='right' color='orange'
          onClick={ this.savePoll.bind(this) }>
          Create poll

        </Button>
      </Segment>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({ currentUser })
export default connect(mapStateToProps, { savePoll })(CreatePoll)
