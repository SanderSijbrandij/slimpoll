import React, { PureComponent, PropTypes } from 'react'

import UserForm from './UserForm'

class SignIn extends PureComponent {
  render() {
    return <UserForm signup={false} />
  }
}

export default SignIn
