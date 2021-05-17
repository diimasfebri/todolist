const express = require('express')

const user = require('../models/user')

const router = express.Router()


router.post('/daftar', async (req,res) =>{
  const {
    body: {nama, username, password}
  } = req
   try {
     if (typeof username !== 'string' || username.length === 0)
      throw new Error('INVALID_REQUEST')
     if (password.length === 0 && typeof password !== 'string')
      throw new Error('INVALID_REQUEST')
      //INPUT DATA KE DATABASE
     const newAkun = new user({
      nama, username, password, create_date: new Date()
     })
     await newAkun.save()
     return res.send({ message: 'SUCCESS', user: newAkun})
  } catch (e) {
    const {message} = e
   if (message === 'INVALID_REQUEST') res.status(404).send({message})
   else res.status(500).send({message})
  }
})


router.post('/login', async (req, res) => {
 const {
   body: { username, password}
 } = req
  try {
    //CEK
    const attendee = await user.findOne({ username }).exec()
    if (!attendee)
      throw new Error ('USER_NOT_FOUND')
    if(password !== attendee.password)
      throw new Error ('PASSWORD_NOT_FOUND')
      // mengambil id dari mongodb nya langsung 
    return res.send({ message: 'SUCCESS', user: attendee._id })
 } catch (e) {
   const {message} = e
  if (message === 'INVALID_REQUEST') res.status(404).send({message})
  else res.status(500).send({message})
 }
})
module.exports = router