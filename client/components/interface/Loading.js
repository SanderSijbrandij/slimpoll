import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'

class Loading extends PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired
  }

  render() {
    const { loading } = this.props

    return (
      <div>
      { !loading && null }
      { loading && <span>Loading...</span> }
      </div>
    )
  }
}
const mapStateToProps = ({ loading }) => ({ loading })
export default connect(mapStateToProps)(Loading)
