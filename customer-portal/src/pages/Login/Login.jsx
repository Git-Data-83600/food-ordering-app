import React, { useState } from 'react'
import './Login.css'
import { toast } from 'react-toastify'
import { login } from '../../services/users'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../providers/AuthProvider'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // get the user details from AuthContext
  const { setUser } = useAuthContext()

  // get the navigate function reference
  const navigate = useNavigate()

  const onLogin = async () => {
    if (email.length == 0) {
      toast.warn('Please enter email')
    } else if (password.length == 0) {
      toast.warn('Please enter password')
    } else {
      const result = await login(email, password)
      if (result['status'] == 'success') {
        toast.success('Successfully logged in')

        // cache the required data
        const data = result['data']
        sessionStorage.setItem(
          'name',
          `${data['firstName']} ${data['lastName']}`
        )
        sessionStorage.setItem('token', `${data['token']}`)
        sessionStorage.setItem(
          'user',
          JSON.stringify({
            firstName: data['firstName'],
            lastName: data['lastName'],
          })
        )

        // update the AuthContext
        setUser({
          firstName: data['firstName'],
          lastName: data['lastName'],
        })

        // go to the Home screen
        navigate('/app/products')
      } else {
        toast.error(result['error'])
      }
    }
  }

  return (
    <>
      <div className='container'>
        <h2 className='page-header'>Customer Portal Login</h2>
        <div className='login-form'>
          <div className='mb-3'>
            <label htmlFor=''>Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type='text'
              className='form-control'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor=''>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              className='form-control'
            />
          </div>
          <div className='mb-3'>
            <div className='mb-3'>
              Don't have an account yet?{' '}
              <Link to='/register'>Register here</Link>
            </div>
            <button
              onClick={onLogin}
              className='btn btn-success'
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
