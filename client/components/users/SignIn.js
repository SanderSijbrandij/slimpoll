import React, { PureComponent, PropTypes } from 'react'

import UserForm from './UserForm'

class SignIn extends PureComponent {
  render() {
    return (
      <div>
        <h1>Sign in</h1>
        <UserForm extended={false} />
      </div>
    )
  }
}

export default SignIn
