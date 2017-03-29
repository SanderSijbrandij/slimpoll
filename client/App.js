import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class App extends Component {
  render() {
    return(
      <main className="app">
        {this.props.children}
      </main>
    );
  }
}

export default App
