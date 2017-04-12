import React, { PureComponent } from 'react'
import { history } from '../../store'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { Divider, Input, Button, Modal } from 'semantic-ui-react'

class UserForm extends PureComponent {
  constructor() {
    super()
    this.state = { opened: true }
  }

  handleClose() {
    this.setState({ opened: false })
    history.push('/')
  }

  handleSignUp(event) {
    event.preventDefault()
    const { email, user, password, password_confirmation } = this.refs

    // add validations here.
    if (password.inputRef.value === password_confirmation.inputRef.value) {
      const newUser = {
        name: user.inputRef.value,
        email: email.inputRef.value,
        password: password.inputRef.value
      }
      this.props.submitFunc(newUser)
    }
    return false
  }

  handleSignIn(event) {
    event.preventDefault()
    const { email, password } = this.refs

    // add validations here.
    if (true) {
      const user = {
        email: email.inputRef.value,
        password: password.inputRef.value
      }
      this.props.submitFunc(user)
    }
    return false
  }

  render() {
    const { extended, signedIn } = this.props

    return (
      <Modal open={!signedIn && this.state.opened} onClose={ () => this.handleClose() } dimmer size='small' closeIcon='close'>
        <Modal.Header>
          { extended ? 'Sign up' : 'Sign in' }
        </Modal.Header>
        <Modal.Content>
          <form onSubmit={ extended ? (event) => this.handleSignUp(event) : (event) => this.handleSignIn(event) }>
          <Input fluid ref='email' type='email' icon='envelope' iconPosition='left' placeholder='Email' />
          <Divider hidden />
          
          { extended && <Input fluid ref='user' type='text' icon='user' iconPosition='left' placeholder='Username' /> }
          { extended && <Divider hidden /> }
          
          <Input fluid ref='password'  type='password' icon='lock' iconPosition='left' placeholder='Password' />
          <Divider hidden />
          
          { extended && <Input fluid ref='password_confirmation' type='password' icon='lock' iconPosition='left'  placeholder='Repeat Password' /> }
          { extended && <Divider hidden /> }
          
          <Input type='submit'>
            <Button color='orange'
              onClick={ extended ? (event) => this.handleSignUp(event) : (event) => this.handleSignIn(event) }>
                { extended ? 'Sign up' : 'Sign in' }
              </Button>
          </Input>
          <Divider />

          { extended ? 
            <Link to='/sign-in'>Already have an account? Sign in</Link> : 
            <Link to='/sign-up'>Don't have an account? Sign up</Link> }
          </form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({ signedIn: !!currentUser })
export default connect(mapStateToProps)(UserForm)
