import React, { PureComponent } from 'react'
import { history } from '../../store'

class UserForm extends PureComponent {
  handleSignUp(event) {
    event.preventDefault()

    // add validations here.
    if (true) {
      const user = {
        name: this.refs.name.value,
        email: this.refs.email.value,
        password: this.refs.password.value
      }
      this.props.submitFunc(user)
    }
    return false
  }

  handleSignIn(event) {
    event.preventDefault()

    if (true) {
      const user = {
        email: this.refs.email.value,
        password: this.refs.password.value
      }
      this.props.submitFunc(user)
    }
    return false
  }

  render() {
    const { extended } = this.props
    return(
      <form onSubmit={ extended ? this.handleSignUp.bind(this) : this.handleSignIn.bind(this) }>
        { extended && <input type='text' ref='name' name='name' placeholder='Username' /> }
        <input type='email' ref='email' name='email' placeholder='Email Address' />
        <input type='password' ref='password' name='password' placeholder='Password' />
        { extended && <input type='password' ref='password_confirmation' name='password_confirmation' placeholder='Password Confirmation' /> }
        <input type='submit' value={ extended ? 'Create Account' : 'Sign in'} />
      </form>
    )
  }
}

export default UserForm
