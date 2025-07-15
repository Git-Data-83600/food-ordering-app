const crypto = require('crypto-js')

function createResult(error, data) {
  if (error) {
    // sending error response
    // response.status = 400
    return createError(error)
  } else {
    // sending success response
    return createSuccess(data)
  }
}

function createError(error) {
  return { status: 'error', error }
}

function createSuccess(data) {
  return { status: 'success', data }
}

function encryptPassword(password) {
  return String(crypto.SHA256(password))
}

module.exports = {
  createError,
  createSuccess,
  createResult,
  encryptPassword,
}
