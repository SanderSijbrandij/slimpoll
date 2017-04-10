import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import clearErrors from '../../actions/interface/clear-errors'

import closebutton from '../../assets/images/close.svg'

class ErrorComp extends PureComponent {
  static propTypes = {
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  render() {
    const { error, clearErrors } = this.props
    if (!!error) {
      return (
        <div>
          <div>
            <h3>{ error.type }</h3>
            <img src={ closebutton } width='25px' height='25px' onClick={ clearErrors } />
          </div>
          <p>{ error.message }</p>
        </div>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = ({ error }) => ({ error })
export default connect(mapStateToProps, { clearErrors })(ErrorComp)
