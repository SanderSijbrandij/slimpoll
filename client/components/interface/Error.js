import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import clearErrors from '../../actions/interface/clear-errors'

import { Modal, Button } from 'semantic-ui-react'

class ErrorComp extends PureComponent {
  static propTypes = {
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  render() {
    const { error, clearErrors } = this.props
      return (
        <Modal size='small' open={!!error} onClose={clearErrors}>
          <Modal.Header>{ error.type }</Modal.Header>
          <Modal.Content><p>{ error.message }</p></Modal.Content>
          <Modal.Actions>
            <Button negative content='Close' onClick={clearErrors} />
          </Modal.Actions>
        </Modal>
      )
  }
}

export default ErrorComp
