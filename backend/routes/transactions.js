const express = require('express')
const {
  createTransaction,
  getTransactions,
  getTransaction,
  deleteTransaction,
  updateTransaction
} = require('../controllers/transactionController')
const requireAuth = require('../middleware/requireAuth')


const router = express.Router()
//require auth for all transaction routes
router.use(requireAuth) 

// GET all transaction
router.get('/', getTransactions)

//GET a single transaction
router.get('/:id', getTransaction)

// POST a new transaction
router.post('/', createTransaction)

// DELETE a transaction
router.delete('/:id', deleteTransaction)

// UPDATE a transaction
router.patch('/:id', updateTransaction)


module.exports = router