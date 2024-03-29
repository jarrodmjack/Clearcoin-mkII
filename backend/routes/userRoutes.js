const express = require('express')
const {
  signupUser,
  loginUser,
} = require('../controllers/userController')
// const requireAuth = require('../middleware/requireAuth')

const router = express.Router()


// Send login data
router.post('/login', loginUser)


// Send signup data
router.post('/signup', signupUser)


module.exports = router