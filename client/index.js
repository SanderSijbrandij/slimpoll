import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store, { history } from './store'
import { Router, Route, IndexRoute } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'

import App from './App'
import Home from './components/generic/Home'
import NotFound from './components/generic/NotFound'

import SignUp from './components/users/SignUp'
import SignIn from './components/users/SignIn'

import PollsList from './components/polls/PollsList'
import CreatePoll from './components/polls/CreatePoll'

injectTapEventPlugin()

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path='/all-polls' component={PollsList} />

        <Route path='/sign-up' component={SignUp} />
        <Route path='/sign-in' component={SignIn} />

        <Route path='/create-poll' component={CreatePoll} />

        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>,
document.getElementById('root'))
