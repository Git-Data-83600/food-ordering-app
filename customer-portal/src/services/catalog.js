import axios from 'axios'
import { config } from './config'

export async function loadCatalog() {
  try {
    // create url
    const url = `${config.serverBaseUrl}/catalog/food-item/`

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

    // return the response body
    return response.data
  } catch (ex) {
    console.log(`exception: `, ex)
  }
}
