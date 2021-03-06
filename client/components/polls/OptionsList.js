import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Segment, List, Button, Icon, Divider } from 'semantic-ui-react'
import * as d3 from 'd3'
import addVote from '../../actions/polls/vote'
import { getVotes } from '../../helpers/votes'

class OptionsList extends Component {
  static propTypes = {
    poll: PropTypes.object.isRequired,
    voted: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    color: d3.scaleOrdinal().range(['#f2711c', '#2185d0', '#db2828', '#21ba45', '#6435c9', '#00b5ad', '#a333c8', '#a5673f']),
    namedColor: d3.scaleOrdinal().range(['orange', 'blue', 'red', 'green', 'violet', 'teal', 'purple', 'brown'])  
  }

  constructor() {
    super()
    this.state = { answerId: null }
  }

  changeAnswer(answer) { 
    if (this.props.votedOn === 'nobody') { this.setState({ answerId: answer._id }) }
  }

  submitVote(event) {
    event.preventDefault()
    this.props.addVote(this.props.poll._id , this.state.answerId, this.props.poll.answers)
  }

  renderAnswer(answer, index, answers) {
    const totalVotes = getVotes(answers)
    const votePerc = (totalVotes === 0) ? 0 : Math.round(answer.voteCount / totalVotes * 100)
 
    const checkboxColor = this.props.namedColor(answer.text)
    const name = (answer._id === this.state.answerId || answer._id == this.props.votedOn) ? 
      'checkmark box' : 
      'square outline'
    
    const isDisabled = (this.props.votedOn !== 'nobody')
    const isVotedOn = (answer._id === this.props.votedOn)
  
    return (
      <List.Item key={ index } onClick={ this.changeAnswer.bind(this, answer) }>
        <Icon name={name} size='big' 
          color={(isDisabled && !isVotedOn) ? 'grey' : checkboxColor} />
        <List.Content>
          <List.Header>
            <span style={{ color: this.props.color(answer.text) }}>
           { answer.text }
           </span>
          </List.Header>
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
    const totalVotes = getVotes(answers)

    return (
      <Segment basic>
        <List selection divided verticalAlign='middle'>
          { answers.map((e, i, a) => this.renderAnswer(e, i, a)) }
        </List>
        <span>total { totalVotes } vote{ totalVotes !== 1 ? 's' : null }</span>
          <Button color='orange' floated='right' disabled={voted}
            onClick={ this.submitVote.bind(this) }>
            { voted ? 'You already voted' : 'Vote' }
          </Button>
      </Segment>
    )
  }
}

export default connect(null, { addVote })(OptionsList)