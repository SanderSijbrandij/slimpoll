import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'

import signUp from '../../actions/users/sign-up'

class SignUp extends PureComponent {
  handleSubmit(event) {
    event.preventDefault()
    // TODO: add validation
    if (true) {
      const user = {
        // TODO: add form values
      }
      this.props.signUp(user)
    }
  }

  render() {
    return <p>signup form</p>
  }
}
export default connect(null, { signUp })(SignUp)
