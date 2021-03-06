import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Dimmer, Loader } from 'semantic-ui-react'

class Loading extends PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired
  }

  render() {
    const { loading } = this.props

    return (
      <Loader active={this.props.loading}>Loading</Loader>
    )
  }
}

export default Loading
