// import express package
const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('./config')
const utils = require('./utils')
const cors = require('cors')
const morgan = require('morgan')
// const dotenv = require('dotenv')

// load the configuration from .env file
// dotenv.config()
// console.log(process.env['DUMMY_KEY'])

// create app
const app = express()
app.use(cors())
app.use(morgan('dev'))

// set the middleware
app.use(express.json())
app.use(express.urlencoded())

// extract the token to authorize the user
app.use((request, response, next) => {
  // token is not required for images
  if (
    request.url.startsWith('/food-item') ||
    request.url.startsWith('/category')
  ) {
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
      console.log(ex)
      response.send(utils.createError('invalid token'))
    }
  } else {
    next()
  }
})

// enable the static routing
// - get the images from files directory without having any explicit route
app.use(express.static('files'))

// add the routes
const categoryRouter = require('./routes/categories')
const foodItemRouter = require('./routes/foodItems')

app.use('/category', categoryRouter)
app.use('/food-item', foodItemRouter)

// start the application
app.listen(4001, '0.0.0.0', () => {
  console.log(`server started on port 4001`)
})
