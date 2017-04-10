import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Menu, Button, Header, Icon } from 'semantic-ui-react'

import signOut from '../../actions/users/sign-out'

class Navbar extends PureComponent {
  static propTypes = {
    currentUser: PropTypes.object,
    signedIn: PropTypes.bool.isRequired,
    signOut: PropTypes.func.isRequired
  }

  renderSignOut() {
    return <li><a onClick={this.props.signOut} href='#'>Sign Out</a></li>
  }

  renderSignIn() {
    return <li><Link to='/sign-in'>Sign In</Link></li>
  }

  render() {
    const { signedIn } = this.props
    return(
      <Menu stackable borderless>
        <Menu.Item as={Link} to='/'><Header color='orange'>SlimPoll</Header></Menu.Item>
        { signedIn && 
          <Menu.Item>
            <Button color='orange' as={Link} to='/create-poll'>
              <Button.Content visible>Create a poll</Button.Content>
            </Button>
          </Menu.Item> 
        }
        <Menu.Menu position='right'>
          { signedIn &&
            <Menu.Item onClick={this.props.signOut}>Sign out</Menu.Item>
          }
          { !signedIn &&
            <Menu.Item as={Link} to='sign-in'>Sign in</Menu.Item>
          }
        </Menu.Menu>
      </Menu>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  currentUser,
  signedIn: !!currentUser
})
export default connect(mapStateToProps, { signOut })(Navbar)
