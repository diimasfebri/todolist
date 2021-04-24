const express = require('express')

const todo = require('../models/todo')

const router = express.Router()

router.get('/', async  (req, res) => {
  try {
    //ngambil semua data dari database ke variabel "todos"
    const todos = await todo.find({}).exec()
    //kita tambahhkan field "editMode" agar dapat diedit di frontend. "_doc" tempat menyimpan data todos, memang dari mongoDB
    return res.send({ message: 'SUCCESS', todos: todos.map((todo) => ({ ...todo._doc, editMode: false })) })
  } catch (e) {
    const {message} = e
    res.status(500).send({message})
  }  
})

router.post('/create-tasks', async (req, res) => {
 const {
   body: {title, notes}
 } = req
  try {
    if (typeof title !== 'string' || title.length === 0)
     throw new Error('INVALID_REQUEST')
    if (notes.length === 0 && typeof notes !== 'string')
     throw new Error('INVALID_REQUEST')
     //INPUT DATA KE DATABASE
    const newTask = new todo({
      title, notes, create_date : new Date()
    })
    await newTask.save()
    return res.send({ message: 'SUCCESS', todo: newTask})

 } catch (e) {
   const {message} = e
  if (message === 'INVALID_REQUEST') res.status(404).send({message})
  else res.status(500).send({message})
 }
})


router.delete('/delete/:_id', async (req, res) => {
  const {
    params: { _id }
  } = req
  try {
    const task = await todo.findById({ _id }).exec()
    if(!task) throw new Error('TASK_NOT_FOUND')
    await todo.deleteOne({ _id }).exec()
    return res.send({ message : 'SUCCESS'})
  } 
  catch (e) {
    const{message} = e
    if (message === 'TASK_NOT_FOUND') res.status(404).send({ message })
    else res.status(500).send({message})
  }
})

//update semua data 
router.put('/update-todo/:_id', async (req,res) => {
  //inisialisasi variabel terlebih dahulu
  const {
    body : { title, notes, is_done },
    params: { _id }
  } = req
  try {
    const task = await todo.findById({ _id }).exec()
    if (!task) throw new Error('TASK_NOT_FOUND')
    if (typeof notes === 'string') task.notes = notes
    if (typeof title === 'string') task.title = title
    if (is_done !== undefined && typeof is_done === 'boolean') task.is_done = is_done
    //script untuk update data 
    await todo.updateOne({ _id }, {
      //"task" sudah mencakup notes,titles,is_done seperti script diatas
      $set: task 
    }).exec()
    return res.send({ message: 'SUCCESS', todo: task })
  } catch (e) {
    const {message} = e
    if (message === 'TASK_NOT_FOUND') res.status(404).send({ message })
    else res.status(500).send({message})
  }


})

module.exports = router