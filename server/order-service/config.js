const dotenv=require('dotenv')
dotenv.config()

const config = {
  secret: 'SQBOO51UX9j45ERfhLyGamVKIULPWYzI',
  STRIPE_SECRET_KEY:
    process.env[STRIPE_KEY],
  
}
module.exports = config
