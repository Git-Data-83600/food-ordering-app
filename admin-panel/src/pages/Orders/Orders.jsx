import React, { useEffect, useState } from 'react'
import './Orders.css'
import { getAllOrders, updateOrderStatus } from '../../services/orders'
import { toast } from 'react-toastify'

function Orders() {
  const [orders, setOrders] = useState([])
  const [selectedStatus, setSelectedStatus] = useState('')

  const loadAllOrders = async () => {
    const result = await getAllOrders()
    if (result['status'] == 'success') {
      setOrders(result['data'])
    } else {
      toast.error(result['error'])
    }
  }

  useEffect(() => {
    loadAllOrders()
  }, [])

  const onUpdateOrderStatus = async (orderId) => {
    const result = await updateOrderStatus(orderId, selectedStatus)
    if (result['status'] == 'success') {
      toast.success('Order status updated successfully')
      loadAllOrders()
    } else {
      toast.error(result['error'])
    }
  }

  return (
    <div>
      <h2 className='page-header'>Orders</h2>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Date</th>
            <th>Total Price</th>
            <th>Discount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{new Date(item.createdTimestamp).toLocaleDateString()}</td>
              <td>{item.totalPrice.toFixed(2)}</td>
              <td>{item.discount.toFixed(2)}</td>
              <td>{item.status}</td>
              <td>
                <div className='row'>
                  <div className='col-8'>
                    <label className='visually-hidden'>Preference</label>
                    <select
                      className='form-select'
                      onChange={(e) => {
                        setSelectedStatus(e.target.value)
                      }}
                    >
                      <option selected>Choose...</option>
                      <option value='shipped'>Shipped</option>
                      <option value='out-for-delivery'>Out For Delivery</option>
                      <option value='delivered'>Delivered</option>
                      <option value='cancelled'>Cancelled</option>
                    </select>
                  </div>
                  <div className='col-4'>
                    <button
                      onClick={() => {
                        onUpdateOrderStatus(item.id)
                      }}
                      type='submit'
                      className='btn btn-primary btn-sm'
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Orders
