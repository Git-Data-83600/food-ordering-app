import React from 'react'
import './error.css'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <div className='container'>
      <div className='error-container'>
        <div className='title'>Error</div>
        <div className='error-message'>
          Your payment was not successful. Please try again later.
        </div>
        <div className='error-message'>
          <Link to='/app/products'>Home</Link>
        </div>
      </div>
    </div>
  )
}

export default Error
