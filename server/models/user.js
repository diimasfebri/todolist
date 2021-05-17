const { Schema, model } = require('mongoose')

const userSchema = Schema({
  nama: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true 
  },
  create_date: {
    type: Date,
    required: true
  },
})
module.exports = model('users', userSchema)