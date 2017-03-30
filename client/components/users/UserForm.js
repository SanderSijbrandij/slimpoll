import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import signIn from '../../actions/users/sign-in'
import signUp from '../../actions/users/sign-up'

class UserForm extends PureComponent {
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
    return(
      null
    )
  }
}


export default connect(null, { signIn, signUp })(UserForm)
