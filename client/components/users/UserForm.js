import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import signIn from '../../actions/users/sign-in'
import signUp from '../../actions/users/sign-up'

class UserForm extends PureComponent {
  handleSignUp(event) {
    event.preventDefault()
  }

  handleSignIn(event) {
    event.preventDefault()
  }

  render() {
    const { extended } = this.props
    return(
      <form onSubmit={ extended ? this.handleSignUp : this.handleSignIn }>
        { extended && <input type='text' ref='name' name='name' placeholder='Username' /> }
        <input type='email' ref='email' name='email' placeholder='Email Address' />
        <input type='password' ref='password' name='password' placeholder='Password' />
        { extended && <input type='password' ref='password_confirmation' name='password_confirmation' placeholder='Password Confirmation' /> }
        <input type='submit' value={ extended ? 'Create Account' : 'Sign in'} />
      </form>
    )
  }
}

export default connect(null, { signIn, signUp })(UserForm)
