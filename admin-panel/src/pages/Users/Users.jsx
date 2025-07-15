import React, { useEffect, useState } from 'react'
import './Users.css'
import { getAllUsers } from '../../services/users'
import { toast } from 'react-toastify'
import { toggleUserStatus as toggleUserStatusServer } from '../../services/users'

function Users() {
  const [users, setUsers] = useState([])

  const loadAllUsers = async () => {
    const result = await getAllUsers()
    if (result['status'] == 'success') {
      setUsers(result['data'])
    } else {
      toast.error(result['error'])
    }
  }

  useEffect(() => {
    loadAllUsers()
  }, [])

  const toggleUserStatus = async (userId, status) => {
    const result = await toggleUserStatusServer(userId, status)
    if (result['status'] == 'success') {
      toast.success('successfully toggled user status')
      loadAllUsers()
    } else {
      toast.error(result['error'])
    }
  }

  return (
    <div>
      <h2 className='page-header'>Users</h2>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.is_active == 1 ? 'Active' : 'Inactive'}</td>
              <td>
                <button
                  onClick={() => {
                    toggleUserStatus(item.id, item.is_active == 1 ? 0 : 1)
                  }}
                  className='btn btn-link'
                >
                  Toggle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
