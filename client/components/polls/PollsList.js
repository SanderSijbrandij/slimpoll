import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { List, Segment, Header, Divider } from 'semantic-ui-react'
import { history } from '../../store'
import { getTotalVotes } from '../../helpers/votes'
import PollItem from './PollItem'

class PollsList extends PureComponent {
  componentDidMount() {
    if (!this.props.currentUser) { history.push('/sign-in') }
  }

  renderPoll(p, i) {
    return <PollItem poll={p} key={i} />
  }

  render() {
    const allPolls = (this.props.location.pathname === '/all-polls')
    const polls = allPolls ? 
      this.props.polls :
      this.props.polls.filter((poll) => this.props.currentUser._id === poll.createdBy._id)

    return (
      <Segment basic>
        <Header attached='top' as='h2'>
          { allPolls ? 'All Polls' : 'Your Polls' }
        </Header>
        <Segment attached>
          { allPolls ? 'There are' : 'You have' } a total of { polls.length } polls.
          <br/>
          A total of { getTotalVotes(polls) } votes have been cast on these polls.
          <Divider />
          <List animated divided relaxed link>
            { polls.map((p, i) => this.renderPoll(p, i)) }
          </List>
        </Segment>
      </Segment>
    )
  }
}

const mapStateToProps = ({ currentUser, polls }) => ({
  currentUser,
  polls
})
export default connect(mapStateToProps)(PollsList)