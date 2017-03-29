import React, { Component, PropTypes } from 'react'
import './assets/stylesheets/main.sass'
import './assets/stylesheets/theme.sass'

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
