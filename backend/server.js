require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const transactionRoutes = require('./routes/transactions')
const userRoutes = require('./routes/userRoutes')
const path = require('path')

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes

app.use('/api/transactions', transactionRoutes)
app.use('/api/user', userRoutes)
app.use(express.static('../frontend/build'))
app.get("*", (req, res) =>
  res.sendFile(
    path.resolve(__dirname, "../", 'frontend', 'build', 'index.html')
  )
)


// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })