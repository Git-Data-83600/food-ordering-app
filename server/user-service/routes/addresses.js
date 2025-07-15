// import module
const express = require('express')
const db = require('../database')
const utils = require('../utils')

// get the router
const router = express.Router()

// get the list addresses
router.get('/', (request, response) => {
  // statement
  const statement = `
        select id, title, line1, line2, line3, zipcode, state
        from addresses where userId = ? and is_deleted = 0
    `

  db.pool.query(statement, [request['userInfo']['id']], (error, addresses) => {
    response.send(utils.createResult(error, addresses))
  })
})

// add a new address
router.post('/', (request, response) => {
  const { title, line1, line2, line3, zipcode, state } = request.body

  // SQL statement
  const statement = `insert into addresses (title, line1, line2, line3, zipcode, state, userId) 
     values (?, ?, ?, ?, ?, ?, ?)`

  db.pool.execute(
    statement,
    [title, line1, line2, line3, zipcode, state, request['userInfo']['id']],
    (error, data) => {
      response.send(utils.createResult(error, data))
    }
  )
})

// update the existing address
// add a new address
router.put('/:addressId', (request, response) => {
  const { addressId } = request.params
  const { title, line1, line2, line3, zipcode, state } = request.body

  // SQL statement
  const statement = `update addresses 
    set title = ?, line1 = ?, line2  = ?, line3 = ?, zipcode = ?, state = ?, userId = ?
    where id = ?
  `

  db.pool.execute(
    statement,
    [
      title,
      line1,
      line2,
      line3,
      zipcode,
      state,
      request['userInfo']['id'],
      addressId,
    ],
    (error, data) => {
      response.send(utils.createResult(error, data))
    }
  )
})

// delete an address
router.delete('/:addressId', (request, response) => {
  // get the addressId from request
  const { addressId } = request.params

  // SQL statement
  const query =
    'update addresses set is_deleted = 1 where id = ? and userId = ?'

  db.pool.execute(
    query,
    [addressId, request['userInfo']['id']],
    (error, result) => {
      response.send(utils.createResult(error, result))
    }
  )
})

// export the router
module.exports = router
