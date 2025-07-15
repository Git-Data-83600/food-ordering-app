import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../providers/AuthProvider'

function Navbar() {
  // read the user info from AuthContext
  const { setUser } = useAuthContext()

  // get the navigate function reference
  const navigate = useNavigate()

  const onLogout = () => {
    // remove all cached data (name, token)
    sessionStorage.removeItem('name')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('user')

    // reset the user in AuthContext
    setUser(null)

    // go to the login screen
    navigate('/')
  }

  return (
    <nav
      className='navbar navbar-expand-lg bg-primary'
      data-bs-theme='dark'
    >
      <div className='container-fluid'>
        <Link
          className='navbar-brand'
          to='/dashboard'
        >
          Admin
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavAltMarkup'
          aria-controls='navbarNavAltMarkup'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className='collapse navbar-collapse'
          id='navbarNavAltMarkup'
        >
          <div className='navbar-nav'>
            <Link
              className='nav-link'
              aria-current='page'
              to='/app/dashboard'
            >
              Dashboard
            </Link>
            <Link
              className='nav-link'
              to='/app/users'
            >
              Users
            </Link>
            <Link
              className='nav-link'
              to='/app/orders'
            >
              Orders
            </Link>
            <Link
              className='nav-link'
              to='/app/messages'
            >
              Messages
            </Link>

            <button
              onClick={onLogout}
              className='nav-link'
              aria-disabled='true'
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
