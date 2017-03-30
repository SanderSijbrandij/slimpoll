import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'

import signUp from '../../actions/users/sign-up'
import UserForm from './UserForm'

class SignUp extends PureComponent {
  render() {
    return (
      <div>
        <h1>Sign up</h1>
        <UserForm extended={true} submitFunc={this.props.signUp} />
      </div>
    )
  }
}

export default connect(null, { signUp })(SignUp)
