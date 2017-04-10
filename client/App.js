import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Container } from 'semantic-ui-react'

import Navbar from './components/interface/Navbar'
import Loading from './components/interface/Loading'
import ErrorComp from './components/interface/Error'

import fetchPolls from './actions/polls/fetch'
import subscribeToPolls from './actions/polls/subscribe'
import clearErrors from './actions/interface/clear-errors'

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
      <Container text={true}>
        <Loading loading={this.props.loading} />
        <ErrorComp error={this.props.error} clearErrors={this.props.clearErrors} />
        <Navbar />
        <main>{this.props.children}</main>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({ 
  subscribedToPolls: state.subscribedToPolls,
  loading: state.loading,
  error: state.error
})

const actions = {
  subscribeToPolls,
  fetchPolls,
  clearErrors
}
export default connect(mapStateToProps, actions)(App)
