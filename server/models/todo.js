const { Schema, model } = require('mongoose')

const todoSchema = Schema({
  title: {
    type: String,
    required: true
  },
 notes: {
    type: String,
  },
  create_date: {
    type: Date,
    required: true
  },
  is_done: {
    type: Boolean,
    default: false
  }
})
module.exports = model('todos', todoSchema)