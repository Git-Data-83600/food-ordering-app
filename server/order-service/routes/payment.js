const express = require('express')
const router = express.Router()
const config = require('../config')
const utils = require('../utils')

// load the Stripe library
const stripe = require('stripe')(config.STRIPE_SECRET_KEY)

router.post('/make-payment', async (request, response) => {
  const { products } = request.body

  // calculate the total amount and make the stripe payment
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: products.map((product) => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: product.title,
        },
        unit_amount: product.price * 100, // convert to cents
      },
      quantity: product.quantity,
    })),
    mode: 'payment',
    success_url:
      'http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:5173/cancel',
  })

  response.send(utils.createSuccess({ id: session.id }))
})

module.exports = router
