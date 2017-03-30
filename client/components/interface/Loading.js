import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

class Loading extends PureComponent {
  pastDelay() {
    // return (new Date().getTime() - this.props.timer > 200)
    return true
  }

  render() {
    const { loading } = this.props
    const classes = (loading && this.pastDelay()) ? 'loading' : 'notloading'

    return (
      <div className={classes}>
      { (!loading || !this.pastDelay()) && null }
      { (loading && this.pastDelay()) && <span>Loading...</span> }
      </div>
    )
  }
}
const mapStateToProps = ({ loading }) => ({
  loading: loading.status,
  timer: loading.timer
})
export default connect(mapStateToProps)(Loading)
