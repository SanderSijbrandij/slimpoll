import React, { PureComponent, PropTypes } from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import { List } from 'semantic-ui-react'
import { getVotes } from '../../helpers/votes'

class PollItem extends PureComponent {
  render() {
    const { poll, index } = this.props
    const url = '/poll/' + poll._id
    const votes = getVotes(poll.answers)

    return ( 
      <List.Item as={Link} to={url}>
        <List.Content>
          <List.Header>{ poll.question }</List.Header>
          <List.Description>
            Created { moment(poll.createdAt).fromNow() } by { poll.createdBy.name } <br />
            { votes } vote{ votes === 1 ? null : 's' }
          </List.Description>
        </List.Content>
      </List.Item>
    )
  }
}

export default PollItem
