import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadCookie } from '../../helpers/session-id'
import { Segment, Header, Grid } from 'semantic-ui-react'
import OptionsList from './OptionsList'
import PieChart from './PieChart'

class Poll extends PureComponent {
  static propTypes = {
    poll: PropTypes.object,
    currentUser: PropTypes.object
  }

  static defaultProps = {
    poll: { question: '', answers: [], createdBy: {}, voters: [] }
  }

  render() {
    const { poll, currentUser } = this.props
    const { question, answers, createdBy, voters } = poll
    const totalVotes = answers.reduce((curr, next) => {
      return curr + next.voteCount
    }, 0)
    const sessionId = loadCookie() || null
    const voted = (!!sessionId && voters.indexOf(sessionId) !== -1)
    return (
      <div>
        <Header as='h2' attached='top'>
          { question }
          <Header.Subheader>
              by { ( !!currentUser && createdBy._id === currentUser._id ) ? 
              'You' : 
              createdBy.name }
          </Header.Subheader>
        </Header>
        <Segment attached>         
          <OptionsList poll={poll} voted={voted} />
          { totalVotes > 0 && <PieChart data={answers} /> }
        </Segment>
      </div>
    )
  }
}

const mapStateToProps = ({ polls , currentUser }, ownProps) => ({
  poll: polls.filter((poll) => { return (ownProps.params.pollId == poll._id) })[0],
  currentUser
})

export default connect(mapStateToProps)(Poll)
