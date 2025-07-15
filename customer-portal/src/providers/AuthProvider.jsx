import React, { createContext, useContext, useState } from 'react'

// create a context to share the user details with all the components
const AuthContext = createContext()

function AuthProvider({ children }) {
  const [user, setUser] = useState(sessionStorage.getItem('user') || null)
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

// create a custom hook to use the AuthContext
export function useAuthContext() {
  return useContext(AuthContext)
}
