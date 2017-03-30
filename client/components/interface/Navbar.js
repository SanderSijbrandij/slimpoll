import React, { PureComponent } from 'react'
import { Link } from 'react-router'

class Navbar extends PureComponent {
  render() {
    return(
      <header className='page-header'>
        <span><Link to='/'>SlimPoll</Link></span>
        <nav className='navbar'>
          <li><Link to="/all-polls">Polls</Link></li>
          <li><Link to="/create-poll">Create a poll</Link></li>
          <li><Link to="/my-polls">View your polls</Link></li>
        </nav>
      </header>
    )
  }
}

export default Navbar
