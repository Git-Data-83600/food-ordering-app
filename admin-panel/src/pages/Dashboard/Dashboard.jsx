import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import { getDashboardSummary } from '../../services/orders'
import ReactApexChart from 'react-apexcharts'
import { getAllUsers } from '../../services/users'

function Dashboard() {
  const [users, setUsers] = useState(0)
  const [orders, setOrders] = useState(0)
  const [pendingOrders, setPendingOrders] = useState(0)
  const [completedOrders, setCompletedOrders] = useState(0)
  const [revenue, setRevenue] = useState(0)

  const [state] = React.useState({
    series: [
      {
        name: 'Revenue',
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    options: {
      chart: {
        type: 'area',
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },

      title: {
        text: 'Fundamental Analysis of Stocks',
        align: 'left',
      },
      subtitle: {
        text: 'Price Movements',
        align: 'left',
      },
      labels: [
        '2025-01-01',
        '2025-01-02',
        '2025-01-03',
        '2025-01-04',
        '2025-01-05',
        '2025-01-06',
        '2025-01-07',
        '2025-01-08',
        '2025-01-09',
      ],
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        opposite: true,
      },
      legend: {
        horizontalAlign: 'left',
      },
    },
  })

  const loadAllUsers = async () => {
    const result = await getAllUsers()
    if (result['status'] === 'success') {
      setUsers(result['data'].length)
    } else {
      console.error(result['error'])
    }
  }

  const getOrderSummary = async () => {
    const result = await getDashboardSummary()
    if (result['status'] === 'success') {
      let pendingOrders = 0,
        completedOrders = 0,
        revenue = 0
      const data = result['data']
      console.log(data)
      for (const item of data) {
        console.log(`status: ${item.status}, totalPrice: ${item.finalAmount}`)
        if (item.status !== 'delivered') {
          pendingOrders++
        } else if (item.status === 'delivered') {
          completedOrders++
          revenue += item.finalAmount
        }
      }

      setOrders(data.length)

      setPendingOrders(pendingOrders)
      setCompletedOrders(completedOrders)
      setRevenue(revenue.toFixed(2))
    }
  }

  useEffect(() => {
    getOrderSummary()
    loadAllUsers()
  }, [])

  return (
    <div>
      <h2 className='page-header'>Dashboard</h2>
      <div className='mt-4'>
        <div className='row'>
          <div className='col'>
            <div className='card bg-primary text-white'>
              <div className='card-body'>
                <h5 className='card-title'>#Users</h5>
                <p className='card-text count'>{users}</p>
              </div>
            </div>
          </div>

          <div className='col'>
            <div className='card bg-success text-white'>
              <div className='card-body'>
                <h5 className='card-title'>#Orders</h5>
                <p className='card-text count'>{orders}</p>
              </div>
            </div>
          </div>
          <div className='col'>
            <div className='card bg-danger text-white'>
              <div className='card-body'>
                <h5 className='card-title'>#Pending Orders</h5>
                <p className='card-text count'>{pendingOrders}</p>
              </div>
            </div>
          </div>
          <div className='col'>
            <div className='card bg-info text-white'>
              <div className='card-body'>
                <h5 className='card-title'>Completed Orders</h5>
                <p className='card-text count'>{completedOrders}</p>
              </div>
            </div>
          </div>
          <div className='col'>
            <div className='card bg-secondary text-white'>
              <div className='card-body'>
                <h5 className='card-title'>Revenue</h5>
                <p className='card-text count'>${revenue}</p>
              </div>
            </div>
          </div>
        </div>

        <div className='row mt-5'>
          <div className='col'>
            <div id='chart'>
              <ReactApexChart
                options={state.options}
                series={state.series}
                type='area'
                height={350}
              />
            </div>
          </div>

          <div className='col'>
            <div id='chart'>
              <ReactApexChart
                options={state.options}
                series={state.series}
                type='area'
                height={350}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
