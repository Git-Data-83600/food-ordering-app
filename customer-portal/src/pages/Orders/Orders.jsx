import React, { useState } from 'react'
import './Orders.css'
import { getMyOrders } from '../../services/orders'
import { toast } from 'react-toastify'

function Orders() {
  const [items, setItems] = useState([])

  const loadMyOrders = async () => {
    const result = await getMyOrders()
    if (result['status'] === 'success') {
      console.log('Orders: ', result['data'])
      setItems(result['data'])
      toast.success('Orders loaded successfully')
    } else {
      toast.error('Failed to load orders:', result['message'])
    }
  }

  // Load orders when the component mounts
  React.useEffect(() => {
    loadMyOrders()
  }, [])

  return (
    <div>
      <h2 className='page-header'>Orders</h2>
      <table className='table table-striped'>
        <thead>
          <th>Order Id</th>
          <th>Date</th>
          <th>Payment Id</th>
          <th>Total Price</th>
          <th>Discount</th>
          <th>Status</th>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.id}</td>
              <td>{new Date(item.createdTimestamp).toLocaleDateString()}</td>
              <td>{item.paymentId}</td>
              <td>{item.totalPrice.toFixed(2)}</td>
              <td>{item.discount.toFixed(2)}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Orders
