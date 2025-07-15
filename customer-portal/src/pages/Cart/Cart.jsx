import React, { useEffect, useState } from 'react'
import './Cart.css'
import { useDispatch, useSelector } from 'react-redux'
import { config } from '../../services/config'
import {
  removeFromCartAction,
  updateQuantityAction,
} from '../../slices/cartSlice'
import { makePayment } from '../../services/orders'
import { toast } from 'react-toastify'
import { loadStripe } from '@stripe/stripe-js'

function Cart() {
  const [total, setTotal] = useState(0)
  const { items } = useSelector((store) => store.cart)
  console.log('items: ', items)

  // get the dispatch function reference
  const dispatch = useDispatch()

  const calculateTotal = () => {
    let total = 0
    for (const item of items) {
      total += item.price * item.quantity
    }
    setTotal(total)
  }

  useEffect(() => {
    calculateTotal()
  }, [])

  useEffect(() => {
    // when there is a change in items, call calculateTotal()
    calculateTotal()
  }, [items])

  const onMakePayment = async () => {
    const result = await makePayment(items)
    if (result['status'] == 'success') {
      // get the session id from the result
      const sessionId = result['data']['id']

      // create a stripe instance
      const stripe = await loadStripe(
        'pk_test_51Rg6QCSEyr5y8T9Q3VJpcSl9XapNrIRzlXztM8xHNG3fzzXdzH1W9Fcv6qYm0ZzrQjoKsiB80ID4UpJwY3uyXvlH00AjtrCmWE'
      )

      // redirect to the checkout page
      const stripeResult = await stripe.redirectToCheckout({
        sessionId: sessionId,
      })

      console.log('stripeResult: ', stripeResult)
    } else {
      toast.error('Payment failed. Please try again.')
    }
  }

  const onIncrement = (item) => {
    dispatch(
      updateQuantityAction({
        id: item.id,
        quantity: 1,
      })
    )
  }

  const onDecrement = (item) => {
    if (item.quantity == 1) {
      dispatch(removeFromCartAction({ id: item.id }))
    } else {
      dispatch(
        updateQuantityAction({
          id: item.id,
          quantity: -1,
        })
      )
    }
  }

  return (
    <div>
      <h2 className='page-header'>Cart</h2>
      {items.length > 0 && (
        <div className='row'>
          <div className='col-9'>
            {items.map((item) => {
              const imageUrl = `${config.serverBaseUrlCatalog}/${item['image']}`

              return (
                <div
                  className='item-container'
                  style={{
                    justifyContent: 'space-between',
                  }}
                >
                  <div className='item-container'>
                    <img
                      src={imageUrl}
                      className='thumbnail'
                    />
                    <div>
                      <div className='title'>{item.title}</div>
                      <div className='description'>{item.description}</div>
                    </div>
                  </div>

                  <div className='item-container'>
                    <div>
                      <div>Price</div>
                      <div style={{ textAlign: 'center' }}>
                        Rs. {item.price}
                      </div>
                    </div>
                    <div>
                      <div>Total Price</div>
                      <div style={{ textAlign: 'center' }}>
                        Rs. {item.price * item.quantity}
                      </div>
                    </div>
                    <div className='item-container'>
                      <button
                        onClick={() => onIncrement(item)}
                        className='btn btn-success'
                      >
                        +
                      </button>
                      <div>{item.quantity}</div>
                      <button
                        onClick={() => onDecrement(item)}
                        className='btn btn-success'
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className='col-3'>
            <div className='cart-summary'>
              <table className='table'>
                <tbody>
                  <tr>
                    <td>Total</td>
                    <td>Rs. {total}</td>
                  </tr>
                  <tr>
                    <td>GST</td>
                    <td>Rs. {total * 0.18}</td>
                  </tr>
                  <tr>
                    <td>Total Amount</td>
                    <td className='title'>Rs. {total + total * 0.18}</td>
                  </tr>
                </tbody>
              </table>

              <button
                onClick={onMakePayment}
                style={{ width: '100%' }}
                className='btn btn-primary'
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {items.length == 0 && (
        <h4 className='page-header'>There are no items in the cart</h4>
      )}
    </div>
  )
}

export default Cart
