import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { registerUser } from '../../services/users'
import { Link, useNavigate } from 'react-router-dom'
import './Register.css'

function Register() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // get the navigation function reference
  const navigate = useNavigate()

  const onRegister = async () => {
    if (firstName.length == 0) {
      toast.warn('Please enter first name')
    } else if (lastName.length == 0) {
      toast.warn('Please enter last name')
    } else if (email.length == 0) {
      toast.warn('Please enter email')
    } else if (password.length == 0) {
      toast.warn('Please enter password')
    } else if (confirmPassword.length == 0) {
      toast.warn('Please confirm password')
    } else if (password != confirmPassword) {
      toast.warn('Password does not match')
    } else {
      const result = await registerUser(firstName, lastName, email, password)
      if (result['status'] == 'success') {
        toast.success('Successfully registered a new user')

        // go to the login page
        // navigate('/')

        // go back to the previous page
        navigate(-1)
      }
    }
  }

  return (
    <div className='container'>
      <h2 className='page-header'>Register</h2>
      <div className='register-form'>
        <div className='mb-3'>
          <label htmlFor=''>First Name</label>
          <input
            onChange={(e) => setFirstName(e.target.value)}
            type='text'
            className='form-control'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor=''>Last Name</label>
          <input
            onChange={(e) => setLastName(e.target.value)}
            type='text'
            className='form-control'
          />
        </div>
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
          <label htmlFor=''>Confirm Password</label>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type='password'
            className='form-control'
          />
        </div>
        <div className='mb-3'>
          <div className='mb-3'>
            Already have an account yet? <Link to='/'>Login here</Link>
          </div>
          <button
            onClick={onRegister}
            className='btn btn-success'
          >
            Register
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register
