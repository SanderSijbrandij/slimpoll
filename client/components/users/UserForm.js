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
      // this.props.signIn/Up(user)
    }
  }

  render() {
    return(
      <div>
        { this.props.extended ? 'sign up' : 'sign in'}
      </div>
    )
  }
}

export default connect(null, { signIn, signUp })(UserForm)
