import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

class Loading extends PureComponent {
  render() {
    const { loading } = this.props
    const classes = loading ? 'loading' : 'notloading'

    return (
      <div className={classes}>
      { !loading && null }
      { loading && <span>Loading...</span> }
      </div>
    )
  }
}
const mapStateToProps = ({ loading }) => ({ loading })
export default connect(mapStateToProps)(Loading)
