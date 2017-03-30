import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import clearErrors from '../../actions/interface/clear-errors'

import closebutton from '../../assets/images/close.svg'

class ErrorComp extends PureComponent {
  render() {
    const { error } = this.props
    if (!!error) {
      return (
        <div className='error'>
          <div className='closebutton'>
            <h3>{ error.type }</h3>
            <img src={ closebutton } width='25px' height='25px'
              onClick={ this.props.clearErrors } />
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
