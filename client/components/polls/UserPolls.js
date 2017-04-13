import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import moment from 'moment'
import { List, Segment, Header, Divider } from 'semantic-ui-react'

class UserPolls extends PureComponent {
  getTotalVotes(polls) {
    return polls.reduce((currp, nextp) => {
      return currp + this.getVotes(nextp.answers)
    }, 0)
  }

  getVotes(answers) {
    return answers.reduce((curr, next) => {
      return curr + next.voteCount
    }, 0)
  }

  renderPoll(poll, index) {
    const url = '/poll/' + poll._id
    const votes = this.getVotes(poll.answers)

    return ( 
      <List.Item key={index} >
        <List.Header as={Link} to={url}>{ poll.question }</List.Header>
        <List.Description>
          Created { moment(poll.createdAt).fromNow() } <br/>
          { votes } vote{ votes === 1 ? null : 's' }
        </List.Description>
      </List.Item>
    )
  }

  render() {
    const { polls } = this.props

    return (
      <Segment basic>
        <Header attached='top' as='h2'>
          Your Polls
        </Header>
        <Segment attached>
          You have a total of { polls.length } polls.
          <br/>
          A total of { this.getTotalVotes(polls) } votes have been cast on your polls.
          <Divider />
          <List divided relaxed>
            { polls.map((p, i) => this.renderPoll(p, i)) }
          </List>

        </Segment>
        
      </Segment>
    )
  }
}

const mapStateToProps = ({ currentUser, polls }) => ({
  currentUser,
  polls: polls.filter((poll) => currentUser._id === poll.createdBy._id)
})
export default connect(mapStateToProps)(UserPolls)