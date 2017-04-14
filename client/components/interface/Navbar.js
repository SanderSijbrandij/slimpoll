import React, { PureComponent, PropTypes } from 'react'
import { Link } from 'react-router'
import { Menu, Button, Header, Dropdown } from 'semantic-ui-react'

class Navbar extends PureComponent {
  static propTypes = {
    currentUser: PropTypes.object,
    signedIn: PropTypes.bool.isRequired,
    signOut: PropTypes.func.isRequired
  }

  render() {
    const { signedIn, signOut, currentUser } = this.props
    return(
      <Menu borderless>
        <Menu.Item as={Link} to='/'><Header color='grey'>SlimPoll</Header></Menu.Item>
        { signedIn && 
          <Menu.Item id='createbutton'>
            <Button basic animated='vertical' color='orange' as={Link} to='/create-poll'>
              <Button.Content visible>Create a poll</Button.Content>
              <Button.Content hidden>Easy as 1. 2. 3.</Button.Content>
            </Button>
          </Menu.Item> 
        }
        <Menu.Menu position='right'>
          { signedIn &&
            <Dropdown item closeOnBlur text={ currentUser.name }>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to='/create-poll'>Create a poll</Dropdown.Item>
                <Dropdown.Item as={Link} to='/my-polls'>Your polls</Dropdown.Item>
                <Dropdown.Item as={Link} to='/all-polls'>All polls</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={signOut}>Sign out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          }
          { !signedIn &&
            <Menu.Item as={Link} to='/all-polls'>All Polls</Menu.Item>
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
