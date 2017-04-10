import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Segment, List, Button, Icon, Divider } from 'semantic-ui-react'

import addVote from '../../actions/polls/vote'

class OptionsList extends PureComponent {
  static propTypes = {
    poll: PropTypes.object.isRequired,
    voted: PropTypes.bool.isRequired,
  }

  constructor() {
    super()
    this.state = { answerId: null }
  }

  changeAnswer(answer) { this.setState({ answerId: answer._id }) }

  submitVote(event) {
    event.preventDefault()
    this.props.addVote(this.props.poll._id , this.state.answerId, this.props.poll.answers)
  }

  renderAnswer(answer, index, answers) {
    const totalVotes = answers.reduce((curr, next) => { return curr + next.voteCount }, 0)
    const votePerc = (totalVotes === 0) ? 0 : Math.round(answer.voteCount / totalVotes * 100)
    const color = (answer._id === this.state.answerId) ? 'orange' : 'grey'
    const name = (answer._id === this.state.answerId) ? 'checkmark box' : 'square outline'
    return (
      <List.Item key={ index } onClick={ this.changeAnswer.bind(this, answer) }>
        <Icon name={name} color={color} size='big' />
        <List.Content>
          <List.Header>{ answer.text }</List.Header>
          <List.Description>
            voted { answer.voteCount } times ({ votePerc }%)
          </List.Description>
        </List.Content>
      </List.Item>
    )
  }

  render() {
    const { poll, voted } = this.props
    const { question, answers, createdBy, voters } = poll
    const totalVotes = answers.reduce((curr, next) => {
      return curr + next.voteCount
    }, 0)

    return (
      <Segment basic>
        <List selection divided verticalAlign='middle'>
          { answers.map((e, i, a) => this.renderAnswer(e, i, a)) }
        </List>
        <span>total { totalVotes } vote{ totalVotes !== 1 ? 's' : null }</span>
        { !voted && 
          <Button color='orange' floated='right'
            onClick={ this.submitVote.bind(this) }>
            Vote
          </Button>
        }
      </Segment>
    )
  }
}

export default connect(null, { addVote })(OptionsList)