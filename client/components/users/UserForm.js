import React, { PureComponent } from 'react'
import { history } from '../../store'
import { Link } from 'react-router'

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

  renderOppositeForm() {
    const { extended } = this.props
    return extended ?
      <Link to='/sign-in'>Already have an account? Sign in</Link> :
      <Link to='/sign-up'>Don't have an account? Sign up</Link>
  }

  render() {
    const { extended } = this.props
    return(
      <form onSubmit={ extended ? this.handleSignUp.bind(this) : this.handleSignIn.bind(this) }>
        <div className='form-group'>
          { extended && <input type='text' ref='name' name='name' placeholder='Username' className='input' /> }
          <input type='email' ref='email' name='email' placeholder='Email Address' className='input'  />
          <input type='password' ref='password' name='password' placeholder='Password' className='input'  />
          { extended && <input type='password' ref='password_confirmation' name='password_confirmation' placeholder='Password Confirmation' className='input'  /> }
        </div>
          <div className='form-group'>
            <button className='button button-fullwidth button-primary'>{ extended ? 'Sign up' : 'Sign in' }</button>
          </div>
          <div className='form-group'>
            { this.renderOppositeForm.bind(this)() }
          </div>
      </form>
    )
  }
}

export default UserForm
