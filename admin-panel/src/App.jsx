import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import AuthProvider from './providers/AuthProvider'
import Home from './pages/Home/Home'
import Dashboard from './pages/Dashboard/Dashboard'
import Users from './pages/Users/Users'
import Orders from './pages/Orders/Orders'
import Messages from './pages/Messages/Messages'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route
            path='/'
            element={<Login />}
          />
          <Route
            path='/app'
            element={<Home />}
          >
            <Route
              path='dashboard'
              element={<Dashboard />}
            />
            <Route
              path='users'
              element={<Users />}
            />
            <Route
              path='orders'
              element={<Orders />}
            />
            <Route
              path='messages'
              element={<Messages />}
            />
          </Route>
        </Routes>
      </AuthProvider>

      <ToastContainer />
    </div>
  )
}

export default App
