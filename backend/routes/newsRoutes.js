const express = require('express')
const { getNews } = require('../controllers/newsController')
// const requireAuth = require('../middleware/requireAuth')

const router = express.Router()


// get news on reload
router.get('/', getNews)



module.exports = router