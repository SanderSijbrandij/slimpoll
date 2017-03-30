import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import signOut from '../../actions/users/sign-out'

class Navbar extends PureComponent {
  checkLoginStatus() {
    return !!this.props.currentUser ? this.renderSignOut() : this.renderSignIn()
  }

  renderSignOut() {
    return <li><a onClick={this.props.signOut} href='#'>Sign Out</a></li>
  }

  renderSignIn() {
    return <li><Link to='/sign-in'>Sign In</Link></li>
  }

  render() {
    return(
      <header className='page-header'>
        <span><Link to='/'>SlimPoll</Link></span>
        <nav className='navbar'>
          <li><Link to="/all-polls">Polls</Link></li>
          <li><Link to="/create-poll">Create a poll</Link></li>
          <li><Link to="/my-polls">View your polls</Link></li>
          { this.checkLoginStatus() }
        </nav>
      </header>
    )
  }
}
const mapStateToProps = ({ currentUser }) => ({ currentUser })
export default connect(mapStateToProps, { signOut })(Navbar)
