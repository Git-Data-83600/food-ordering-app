import axios from 'axios'
import { config } from './config'

export async function getAllOrders() {
  try {
    // create url
    const url = `${config.serverBaseUrl}/order/all`

    // read the token
    const token = sessionStorage.getItem('token')

    // add the token to the headers parameter
    const headers = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }

    // send the request and get the response
    const response = await axios.get(url, headers)
    return response.data
  } catch (error) {
    console.error('Error making payment:', error)
    throw error
  }
}

export async function updateOrderStatus(id, status) {
  try {
    // create url
    const url = `${config.serverBaseUrl}/order/status/${id}/${status}`

    // read the token
    const token = sessionStorage.getItem('token')

    // add the token to the headers parameter
    const headers = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }

    // send the request and get the response
    const response = await axios.patch(url, {}, headers)
    return response.data
  } catch (error) {
    console.error('Error making payment:', error)
    throw error
  }
}

export async function getDashboardSummary() {
  try {
    // create url
    const url = `${config.serverBaseUrl}/order/dashboard`

    // read the token
    const token = sessionStorage.getItem('token')

    // add the token to the headers parameter
    const headers = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }

    // send the request and get the response
    const response = await axios.get(url, headers)
    return response.data
  } catch (error) {
    console.error('Error making payment:', error)
    throw error
  }
}
