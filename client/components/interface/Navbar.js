import React, { PureComponent, PropTypes } from 'react'
import { Link } from 'react-router'
import { Menu, Button, Header, Icon } from 'semantic-ui-react'

class Navbar extends PureComponent {
  static propTypes = {
    currentUser: PropTypes.object,
    signedIn: PropTypes.bool.isRequired,
    signOut: PropTypes.func.isRequired
  }

  render() {
    const { signedIn, signOut } = this.props
    return(
      <Menu stackable borderless>
        <Menu.Item as={Link} to='/'><Header color='grey'>SlimPoll</Header></Menu.Item>
        { signedIn && 
          <Menu.Item>
            <Button basic animated='vertical' color='orange' as={Link} to='/create-poll'>
              <Button.Content visible>Create a poll</Button.Content>
              <Button.Content hidden>Easy as 1. 2. 3.</Button.Content>
            </Button>
          </Menu.Item> 
        }
        <Menu.Menu position='right'>
          { signedIn &&
            <Menu.Item onClick={signOut}>Sign out</Menu.Item>
          }
          { !signedIn &&
            <Menu.Item as={Link} to='sign-in'>Sign in</Menu.Item>
          }
        </Menu.Menu>
      </Menu>
    )
  }
}

export default Navbar
