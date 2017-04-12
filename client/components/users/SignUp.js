import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'

import signUp from '../../actions/users/sign-up'
import UserForm from './UserForm'

class SignUp extends PureComponent {
  render() {
    return (
      <UserForm extended={true} submitFunc={this.props.signUp} />
    )
  }
}

export default connect(null, { signUp })(SignUp)
