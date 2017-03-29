import React, { PureComponent } from 'react'

class Navbar extends PureComponent {
  render() {
    return(
      <header className='page-header'>
        <span>SlimPoll</span>
        <nav className='navbar'>
          <li>Polls</li>
          <li>Create a poll</li>
          <li>View your polls</li>
          <li>Make this menu not bad</li>
        </nav>
      </header>
    )
  }
}

export default Navbar
