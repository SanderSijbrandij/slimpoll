import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'

import signIn from '../../actions/users/sign-in'
import UserForm from './UserForm'

class SignIn extends PureComponent {
  render() {
    return (
      <div>
        <h1>Sign in</h1>
        <UserForm extended={false} submitFunc={this.props.signIn} />
      </div>
    )
  }
}

export default connect(null, { signIn })(SignIn)
