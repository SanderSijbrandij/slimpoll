import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import signOut from '../../actions/users/sign-out'

class Navbar extends PureComponent {
  static propTypes = {
    currentUser: PropTypes.object,
    signedIn: PropTypes.bool.isRequired
  }

  renderSignOut() {
    return <li><a onClick={this.props.signOut} href='#'>Sign Out</a></li>
  }

  renderSignIn() {
    return <li><Link to='/sign-in'>Sign In</Link></li>
  }

  render() {
    const { signedIn } = this.props
    return(
      <header className='page-header'>
        <span><Link to='/'>SlimPoll</Link></span>
        <nav className='navbar'>
          <li><Link to="/all-polls">Polls</Link></li>
          { signedIn && <li><Link to="/create-poll">Create a poll</Link></li> }
          { signedIn && <li><Link to="/my-polls">View your polls</Link></li> }
          { signedIn ? this.renderSignOut() : this.renderSignIn() }
        </nav>
      </header>
    )
  }
}
const mapStateToProps = ({ currentUser }) => ({
  currentUser,
  signedIn: !!currentUser
})
export default connect(mapStateToProps, { signOut })(Navbar)
