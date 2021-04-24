// panggil plugin
const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

//insialisasi router
const todos = require('./routes/todos')
const users = require ('./routes/users')

//inisialisasi
const app = express()
const server = http.createServer(app)


//Panggil Database
mongoose.connect('mongodb://localhost:27017/pomofocus', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).connection


//middleware, berfungsi untuk mengaktifkan file json
app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: false }))


//panggil router  
app
.use('/todos', todos)
.use('/users', users)


  //inisialisasi server
function start() {
  const port = 8000
  server.listen(port)
  console.info(`Server on localhost:${port}`)
}


//jalanin server
start()