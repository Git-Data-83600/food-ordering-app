// import express package
const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('./config')
const utils = require('./utils')
const cors = require('cors')
// const dotenv = require('dotenv')

// load the configuration from .env file
// dotenv.config()
// console.log(process.env['DUMMY_KEY'])

// create app
const app = express()
app.use(cors())

// set the middleware
app.use(express.json())
app.use(express.urlencoded())

// extract the token to authorize the user
app.use((request, response, next) => {
  // read the token from request headers
  let token = request.headers['authorization']
  if (!token) {
    response.send(utils.createError('token is missing'))
    return
  }

  // remove the word Bearer from token
  token = token.replace('Bearer', '').trim()

  try {
    // verify the token
    if (jwt.verify(token, config.secret)) {
      // get the payload
      const payload = jwt.decode(token)

      // add the payload in request with key 'user'
      request['userInfo'] = payload

      // go to the required route
      next()
    } else {
      response.send(utils.createError('invalid token'))
    }
  } catch (ex) {
    response.send(utils.createError('invalid token'))
  }
})

// add the routes
const orderRouter = require('./routes/orders')
const paymentRouter = require('./routes/payment')

app.use('/order', orderRouter)
app.use('/payment', paymentRouter)

// start the application
app.listen(4003, '0.0.0.0', () => {
  console.log(`server started on port 4003`)
})
