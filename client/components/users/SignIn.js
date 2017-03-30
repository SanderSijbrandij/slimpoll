import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'

import signIn from '../../actions/users/sign-in'

class SignIn extends PureComponent {
  handleSubmit(event) {
    event.preventDefault()
    // TODO: add validation
    if (true) {
      const user = {
        // TODO: add form values
      }
      this.props.signIn(user)
    }
  }

  render() {
    return <p>signin form</p>
  }
}
export default connect(null, { signIn })(SignIn)
