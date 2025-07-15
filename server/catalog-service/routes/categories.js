// import required packages
const express = require('express')
const router = express.Router()
const db = require('../database')
const utils = require('../utils')
const multer = require('multer')

// create an object of multer
const upload = multer({ dest: 'files' })

router.post('/', upload.single('photo'), (request, response) => {
  const { title } = request.body
  const statement = `insert into category (title, image) values (?, ?)`
  db.pool.execute(
    statement,
    [title, request.file.filename],
    (error, result) => {
      response.send(utils.createResult(error, result))
    }
  )
})

router.get('/', (request, response) => {
  const statement = `select id, title, image from category where is_active = 1`
  db.pool.query(statement, (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

router.put('/:id', (request, response) => {
  const { id } = request.params
  const { title } = request.body
  const statement = `update category set title = ? where id = ?`
  db.pool.execute(statement, [title, id], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

router.delete('/:id', (request, response) => {
  const { id } = request.params
  const statement = `update category set is_active = 0 where id = ?`
  db.pool.execute(statement, [id], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

module.exports = router
