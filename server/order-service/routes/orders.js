// import required packages
const express = require('express')
const router = express.Router()
const db = require('../database')
const utils = require('../utils')

router.get('/dashboard', (request, response) => {
  const statement = `select id, finalAmount, status from order_master`

  db.pool.query(statement, [request['userInfo']['id']], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

router.get('/all', (request, response) => {
  const statement = `
    select id, addressId, createdTimestamp, totalPrice, discount, finalAmount, paymentStatus, paymentId, status 
    from order_master`

  db.pool.query(statement, [request['userInfo']['id']], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

router.patch('/status/:id/:status', (request, response) => {
  const { id, status } = request.params
  const statement = `update order_master set status = ? where id = ?`

  db.pool.query(statement, [status, id], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

router.get('/', (request, response) => {
  const statement = `
    select id, addressId, createdTimestamp, totalPrice, discount, finalAmount, paymentStatus, paymentId, status 
    from order_master where userId = ?`

  db.pool.query(statement, [request['userInfo']['id']], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

router.post('/', (request, response) => {
  const { products, addressId, discount, paymentId } = request.body

  // calculate the total price
  let totalPrice = 0
  for (const item of products) {
    totalPrice += item['price'] * item['quantity']
  }

  // calculate the final amount
  const finalAmount = totalPrice - discount

  // create order in order_master and get the orderId
  const statementOrderMaster = `
            insert into order_master
                (userId, addressId, totalPrice, discount, finalAmount, paymentId)
            values (?, ?, ?, ?, ?, ?)`

  db.pool.execute(
    statementOrderMaster,
    [
      request['userInfo']['id'],
      addressId,
      totalPrice,
      discount,
      finalAmount,
      paymentId,
    ],
    (error, result) => {
      if (error) {
        response.send(utils.createError(error))
      } else {
        // get the orderId from the result
        const orderId = result['insertId']

        // iterate over the items and insert them one by one  into the order details table
        const rows = []
        for (const item of products) {
          rows.push(
            ` (${orderId}, ${item['id']}, ${item['quantity']}, ${item['price']}) `
          )
        }
        console.log(rows)

        const statementOrderDetails = `
                insert into order_details 
                    (orderId, foodItemId, quantity, price) 
                values ${rows.join(',')}`
        console.log(statementOrderDetails)

        db.pool.execute(statementOrderDetails, (error, result) => {
          if (error) {
            console.log(error)
            response.send(utils.createError(error))
          } else {
            response.send(utils.createSuccess('Order placed successfully'))
          }
        })
      }
    }
  )
})

router.patch('/update–status/:orderId/:status', (request, response) => {
  const { orderId, status } = request.params
  const statement = `update order_master set status = ? where id = ?`
  db.pool.execute(statement, [status, orderId], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

router.delete('/cancel/:id', (request, response) => {
  const { id } = request.params
  const statement = `update order_master set status = 'cancelled' where id = ?`
  db.pool.execute(statement, [id], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

module.exports = router
