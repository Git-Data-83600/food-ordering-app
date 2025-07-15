// import packages
const express = require('express')
const db = require('../database')
const utils = require('../utils')
const config = require('../config')
const jwt = require('jsonwebtoken')
const multer = require('multer')

// create an object to use multer to upload the files
const upload = multer({ dest: 'files' })

// get the router
const router = express.Router()

// user registration
router.post('/register', (request, response) => {
  // get the user details
  const { firstName, lastName, email, password } = request.body

  // create SQL statement
  const statement = `
    insert into admins (firstName, lastName, email, password) values (?, ?, ?, ?) 
  `

  // execute the statement
  db.pool.execute(
    statement,
    [firstName, lastName, email, utils.encryptPassword(password)],
    (error, result) => {
      // send welcome email to the user
      // TODO: send email to the user using notification service

      // send the result to the client
      response.send(utils.createResult(error, result))
    }
  )
})

// user login
router.post('/login', (request, response) => {
  const { email, password } = request.body

  // SQL statement
  const statement = `
    select id, firstName, lastName from admins
    where email = ? and password = ?
  `

  // execute the query
  db.pool.query(
    statement,
    [email, utils.encryptPassword(password)],
    (error, users) => {
      if (error) {
        // error while executing the sql statement
        response.send(utils.createError(error))
      } else {
        // check if the user exists
        if (users.length == 0) {
          // user does not exist
          response.send(utils.createError('admin does not exist'))
        } else {
          // user exists
          const { firstName, lastName, id } = users[0]

          // create payload
          const payload = {
            id,
            firstName,
            lastName,
          }

          try {
            // create a token
            const token = jwt.sign(payload, config.secret)
            response.send(
              utils.createSuccess({
                token,
                firstName,
                lastName,
              })
            )
          } catch (ex) {
            response.send(utils.createError(ex))
          }
        }
      }
    }
  )
})

// forgot password
router.post('/forgot-password', (request, response) => {
  const { email } = request.body

  // check if user exists
  const statement = `select id, firstName, lastName from users where email = ?`

  // execute the query
  db.pool.query(statement, [email], (error, users) => {
    if (error) {
      // error while executing the sql statement
      response.send(utils.createError(error))
    } else {
      // check if the user exists
      if (users.length == 0) {
        // user does not exist
        response.send(utils.createError('user does not exist'))
      } else {
        // user exists
        const user = users[0]

        // TODO: send email to the user using notification service

        // send response
        response.send(utils.createSuccess('please check your email'))
      }
    }
  })
})

// reset password
router.put('/reset-password', (request, response) => {
  const { email, password } = request.body

  // SQL statement
  const statement = `update users set password = ? where email = ?`

  db.pool.execute(
    statement,
    [utils.encryptPassword(password), email],
    (error, result) => {
      response.send(utils.createResult(error, result))
    }
  )
})

// get the user profile
router.get('/profile', (request, response) => {
  // get the user id from request's user object
  const { id } = request['userInfo']

  // SQL statement
  const statement = `select firstName, lastName, email from users where id = ?`

  db.pool.query(statement, [id], (error, users) => {
    response.send(utils.createResult(error, users[0]))
  })
})

// update the profile
router.put('/profile', (request, response) => {
  const { firstName, lastName } = request.body

  // create SQL statement
  const statement = `
    update users set firstName = ?, lastName = ? where id = ? 
  `

  // execute the statement
  db.pool.execute(
    statement,
    [firstName, lastName, request['userInfo']['id']],
    (error, result) => {
      // send the result to the client
      response.send(utils.createResult(error, result))
    }
  )
})

// update the profile image
router.put('/profile-image', upload.single('photo'), (request, response) => {
  // create SQL statement
  const statement = `
    update users set profileImage = ?  where id = ? 
  `

  // execute the statement
  db.pool.execute(
    statement,
    [request.file.filename, request['userInfo']['id']],
    (error, result) => {
      // send the result to the client
      response.send(utils.createResult(error, result))
    }
  )
})

// export the router
module.exports = router
