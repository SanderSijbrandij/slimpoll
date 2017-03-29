import React, { Component, PropTypes } from 'react'

import './assets/stylesheets/main.sass'
import Navbar from './components/interface/Navbar'

class App extends Component {
  render() {
    return(
      <div>
        <Navbar />
        <main className="app">
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default App
