import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import CopyToClipboard from 'react-copy-to-clipboard'
import { loadCookie } from '../../helpers/session-id'
import { Segment, Header, Grid, Icon, Button } from 'semantic-ui-react'
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

  constructor() {
    super()
    this.state = { copied: false }
  }

  filterVotersBySession(voters, sessionId) {
    return voters.filter(voter => {
      return voter.sessionId == sessionId
    })
  }

  render() {
    const { poll, currentUser } = this.props
    const { question, answers, createdBy, voters } = poll
    const totalVotes = answers.reduce((curr, next) => {
      return curr + next.voteCount
    }, 0)
    const sessionId = loadCookie() || null
    const sessionVoter = this.filterVotersBySession(voters, sessionId)
    const voted = (!!sessionId && sessionVoter.length > 0)
    const votedOn = !!sessionVoter[0] ? sessionVoter[0].answerId : 'nobody'

    return (
      <div>
        <Header as='h2' attached='top' style={{ wordWrap: 'break-word' }}>
          { question }
          <Header.Subheader>
              by { ( !!currentUser && createdBy._id === currentUser._id ) ? 
              'You' : 
              createdBy.name }
          </Header.Subheader>
        </Header>
        <Segment attached>
          <Grid>
            <Grid.Row columns={2} divided>
              <Grid.Column>
                <OptionsList poll={poll} voted={voted} votedOn={votedOn} />
              </Grid.Column>
              <Grid.Column>
                <PieChart data={answers} />
              </Grid.Column>
            </Grid.Row>
          </Grid>      
        </Segment>

        <Header attached='top' as='h4'>Poll URL</Header>
        <Segment attached>
          <CopyToClipboard text={ window.location.href }
            onCopy={ () => this.setState({ copied: true }) }>
          <Button animated fluid>
            <Button.Content visible>{ window.location.href }</Button.Content>
            <Button.Content hidden>
              {this.state.copied ? 'Copied!' : 'Click to copy the URL to your clipboard'}
            </Button.Content>
          </Button>
          </CopyToClipboard>
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
