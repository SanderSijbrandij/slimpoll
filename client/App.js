import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Container } from 'semantic-ui-react'
import './assets/style.sass'
import Navbar from './components/interface/Navbar'
import Loading from './components/interface/Loading'
import ErrorComp from './components/interface/Error'

import fetchPolls from './actions/polls/fetch'
import subscribeToPolls from './actions/polls/subscribe'
import clearErrors from './actions/interface/clear-errors'
import signOut from './actions/users/sign-out'

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
    const { loading, error, currentUser, signedIn, children,
      clearErrors, signOut } = this.props

    return(
      <Container text={true}>
        <Loading loading={loading} />
        <ErrorComp error={error} clearErrors={clearErrors} />
        <Navbar currentUser={currentUser} signedIn={signedIn} signOut={signOut} />
        <main>{children}</main>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({ 
  subscribedToPolls: state.subscribedToPolls,
  loading: state.loading,
  error: state.error,
  currentUser: state.currentUser,
  signedIn: !!state.currentUser
})

const actions = {
  subscribeToPolls,
  fetchPolls,
  clearErrors,
  signOut
}
export default connect(mapStateToProps, actions)(App)
