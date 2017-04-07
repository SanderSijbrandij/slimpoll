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

import CreatePoll from './components/polls/CreatePoll'
import Poll from './components/polls/Poll'

injectTapEventPlugin()

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path='/sign-up' component={SignUp} />
        <Route path='/sign-in' component={SignIn} />
        <Route path='/create-poll' component={CreatePoll} />
        <Route path='/poll/:pollId' component={Poll} />

        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>,
document.getElementById('root'))
