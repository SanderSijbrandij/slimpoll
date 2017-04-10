import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Navbar from './components/interface/Navbar'
import Loading from './components/interface/Loading'
import ErrorComp from './components/interface/Error'

import fetchPolls from './actions/polls/fetch'
import subscribeToPolls from './actions/polls/subscribe'

class App extends Component {
  static propTypes = {
    fetchPolls: PropTypes.func.isRequired,
    subscribeToPolls: PropTypes.func.isRequired,
    subscribedToPolls: PropTypes.bool.isRequired
  }
  
  componentWillMount() {
    this.props.fetchPolls()
    if (!this.props.subscribedToPolls) { this.props.subscribeToPolls() }
  }

  render() {
    return(
      <div>
        <Navbar />
        <Loading />
        <ErrorComp />
        <main>
          {this.props.children}
        </main>
      </div>
    );
  }
}

const mapStateToProps = ({ subscribedToPolls }) => ({ subscribedToPolls })
export default connect(mapStateToProps, { subscribeToPolls, fetchPolls })(App)
