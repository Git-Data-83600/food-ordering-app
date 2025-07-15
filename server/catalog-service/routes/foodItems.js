// import required packages
const express = require('express')
const router = express.Router()
const db = require('../database')
const utils = require('../utils')
const multer = require('multer')

// create an object of multer
const upload = multer({ dest: 'files' })

router.post('/', upload.single('photo'), (request, response) => {
  const { title, ingredients, description, categoryId, price } = request.body
  const image = request.file.filename

  const statement = `
        insert into food_item 
            (title, ingredients, description, image, categoryId, price)
            values (?, ?, ?, ?, ?, ?)
    `
  db.pool.execute(
    statement,
    [title, ingredients, description, image, categoryId, price],
    (error, result) => {
      response.send(utils.createResult(error, result))
    }
  )
})

router.get('/', (request, response) => {
  const statement = `
    select id, title, ingredients, description, image, categoryId, price from food_item
    where is_active = 1
  `
  db.pool.execute(statement, (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

router.put('/:id', (request, response) => {
  const { id } = request.params
  const { title, ingredients, description, categoryId, price } = request.body

  const statement = `
      update food_item 
      set title = ?, ingredients = ?, description = ?, categoryId = ?, price = ?
      where id = ?
  `
  db.pool.execute(
    statement,
    [title, ingredients, description, categoryId, price, id],
    (error, result) => {
      response.send(utils.createResult(error, result))
    }
  )
})

router.delete('/:id', (request, response) => {
  const { id } = request.params

  const statement = `update food_item set is_active = 0 where id = ?`
  db.pool.execute(statement, [id], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

module.exports = router
