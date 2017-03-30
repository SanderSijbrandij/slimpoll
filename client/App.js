import React, { Component, PropTypes } from 'react'

import './assets/stylesheets/main.sass'
import Navbar from './components/interface/Navbar'
import Loading from './components/interface/Loading'
import ErrorComp from './components/interface/Error'

class App extends Component {
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

export default App
