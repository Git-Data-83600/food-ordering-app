import React from 'react'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Orders from './pages/Orders/Orders'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Products from './pages/Products/Products'
import Profile from './pages/Profile/Profile'
import NotFound from './pages/NotFound/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import Success from './pages/Payment/Success'
import Error from './pages/Payment/Error'
import AuthProvider from './providers/AuthProvider'
import Messages from './pages/Messages/Messages'

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route
            path='/success'
            element={<Success />}
          />

          <Route
            path='/cancel'
            element={<Error />}
          />

          <Route
            index
            path='/'
            element={<Login />}
          />

          <Route
            path='/register'
            element={<Register />}
          />

          <Route
            path='*'
            element={<NotFound />}
          />

          {/* parent component */}
          {/* if user is available, only then let user to access this component */}
          <Route
            path='/app'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          >
            {/* child components */}

            <Route
              path='cart'
              element={<Cart />}
            />
            <Route
              path='products'
              element={<Products />}
            />
            <Route
              path='orders'
              element={<Orders />}
            />
            <Route
              path='my-profile'
              element={<Profile />}
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
