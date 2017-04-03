import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import './assets/stylesheets/main.sass'
import Navbar from './components/interface/Navbar'
import Loading from './components/interface/Loading'
import ErrorComp from './components/interface/Error'

import subscribeToPolls from './actions/polls/subscribe'

class App extends Component {
  componentWillMount() {
    if (!this.props.subscribedToPolls) { this.props.subscribeToPolls() }
  }

  render() {
    return(
      <div>
        <Navbar />
        <Loading />
        <ErrorComp />
        <main className="app">
          {this.props.children}
        </main>
      </div>
    );
  }
}

const mapStateToProps = ({ subscribedToPolls }) => ({ subscribedToPolls })
export default connect(mapStateToProps, { subscribeToPolls })(App)
