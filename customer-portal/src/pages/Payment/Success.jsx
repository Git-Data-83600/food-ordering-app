import React, { useEffect } from 'react'
import './success.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { clearAction } from '../../slices/cartSlice'
import { placeOrder as placeOrderServer } from '../../services/orders'

function Success() {
  const { items } = useSelector((store) => store.cart)

  // get the query parameters from the URL
  const queryParams = new URLSearchParams(window.location.search)

  // get the dispatch function reference
  const dispatch = useDispatch()

  const placeOrder = async () => {
    const result = await placeOrderServer(items, queryParams.get('session_id'))
    if (result['status'] === 'success') {
      // Handle successful order placement
      toast.success('Order placed successfully')

      // Clear the cart after successful order placement
      dispatch(clearAction())
    } else {
      // Handle order placement failure
      toast.error('Failed to place order')
    }
  }

  useEffect(() => {
    // place the order when the component mounts
    placeOrder()
  }, [])

  return (
    <div className='container'>
      <div className='success-container'>
        <div className='title'>Success</div>
        <div className='success-message'>
          Your payment was successful! Thank you for your purchase.
        </div>
        <div className='success-message'>
          <Link to='/app/products'>Home</Link>{' '}
        </div>
      </div>
    </div>
  )
}

export default Success
