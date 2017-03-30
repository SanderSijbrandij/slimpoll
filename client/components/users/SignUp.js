import React, { PureComponent, PropTypes } from 'react'

import UserForm from './UserForm'

class SignUp extends PureComponent {
  render() {
    return (
      <div>
        <h1>Sign up</h1>
        <UserForm extended={true} />
      </div>
    )
  }
}

export default SignUp
