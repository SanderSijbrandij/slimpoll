import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'

import signIn from '../../actions/users/sign-in'
import UserForm from './UserForm'

class SignIn extends PureComponent {
  render() {
    return (
      <UserForm extended={false} submitFunc={this.props.signIn} />
    )
  }
}

export default connect(null, { signIn })(SignIn)
