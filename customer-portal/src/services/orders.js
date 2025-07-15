import axios from 'axios'
import { config } from './config'

export async function makePayment(products) {
  try {
    // create url
    const url = `${config.serverBaseUrl}/payment/make-payment`

    // create the body
    const body = { products }

    // read the token
    const token = sessionStorage.getItem('token')

    // add the token to the headers parameter
    const headers = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }

    // send the request and get the response
    const response = await axios.post(url, body, headers)
    return response.data
  } catch (error) {
    console.error('Error making payment:', error)
    throw error
  }
}

export async function placeOrder(products, paymentId) {
  try {
    // create url
    const url = `${config.serverBaseUrl}/order/`

    // create the body
    const body = { products, addressId: 1, discount: 0, paymentId }
    console.log('body: ', body)

    // read the token
    const token = sessionStorage.getItem('token')

    // add the token to the headers parameter
    const headers = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }

    // send the request and get the response
    const response = await axios.post(url, body, headers)
    return response.data
  } catch (error) {
    console.error('Error making payment:', error)
    throw error
  }
}

export async function getMyOrders() {
  try {
    // create url
    const url = `${config.serverBaseUrl}/order/`

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
