import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../providers/AuthProvider'

function ProtectedRoute({ children }) {
  // get the user details from AuthContext
  const { user } = useAuthContext()

  // if user exists, then allow the children component
  // else, navigate to the Login component
  return user ? children : <Navigate to='/' />
}

export default ProtectedRoute
