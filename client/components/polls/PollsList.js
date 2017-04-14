import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { List, Segment, Header, Divider, Button, Icon } from 'semantic-ui-react'
import { history } from '../../store'
import { getTotalVotes } from '../../helpers/votes'
import PollItem from './PollItem'
import fetchPolls from '../../actions/polls/fetch'

class PollsList extends PureComponent {
  componentDidMount() {
    if (!this.props.currentUser) { history.push('/sign-in') }
  }

  page(e, n) {
    const { currentPage, pages } = this.props.pollsData
    if (n == 'prev') { 
      n = (currentPage == 1) ? 1 : currentPage-1 
    } else if (n == 'next') {
      n = (currentPage == pages) ? pages : currentPage+1
    }
    this.props.fetchPolls(n)
  }

  makeButtonsArray() {
    const { pollsData } = this.props
    
    let buttons = []
    for (let i = 1; i <= pollsData.pages; i++) {
      const button = pollsData.currentPage == i
      buttons.push(button)
    }
    return buttons
  }

  renderPagination() {
    const pages = this.makeButtonsArray()

    return (
      <div style={{ textAlign: 'center', margin: '0 auto' }}>
      <Button.Group size='mini'>
        <Button animated='fade' color='grey' onClick={ (e, n) => this.page(e, 'prev') }>
          <Button.Content hidden><Icon name='chevron left' /></Button.Content>
          <Button.Content visible>previous</Button.Content>
        </Button>
        {
          pages.map((page, index) => {
            return page ? 
              <Button.Or key={index} text={ index + 1 } /> :
              <Button key={index} onClick={ (e, n) => this.page(e, index+1) }>
                { index + 1}
              </Button>
          })
        }
        <Button animated='fade' color='grey' onClick={ (e, n) => this.page(e, 'next') } >
          <Button.Content hidden><Icon name='chevron right' /></Button.Content>
          <Button.Content visible>next</Button.Content>
        </Button>
      </Button.Group>
      </div>
    )
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
          { this.renderPagination() }
          <Divider />
          <List animated divided relaxed link>
            { polls.map((p, i) => this.renderPoll(p, i)) }
          </List>
        </Segment>
        <Segment attached>
          { this.renderPagination() }
        </Segment>
      </Segment>
    )
  }
}

const mapStateToProps = ({ currentUser, polls, pollsData }) => ({
  currentUser,
  polls,
  pollsData
})
export default connect(mapStateToProps, { fetchPolls })(PollsList)