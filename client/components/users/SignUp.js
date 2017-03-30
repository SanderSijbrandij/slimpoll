import React, { PureComponent, PropTypes } from 'react'

import UserForm from './UserForm'

class SignUp extends PureComponent {
  render() {
    return <UserForm signup={true} />
  }
}

export default SignUp
