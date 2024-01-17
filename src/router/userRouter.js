import express from 'express'
import bcrypt from 'bcrypt'
import UserDataModel from '../model/UserDataModel.js'

const router = express.Router()

router.get('/user', async (req, res) => {
  console.log(req.body)
  const user = await UserDataModel.find().populate('notes', {
    title: 1,
    content: 1,
    important: 1,
    date: 1
  })
  res.json(user)
})

router.post('/user', async (req, res) => {
  const { username, name, password } = req.body
  const passwordHash = await bcrypt.hash(password, 10)
  const userExist = await UserDataModel.exists(username)
  if (userExist) {
    return res.json({ err: ' username is taken' })
  }
  const user = new UserDataModel({
    username,
    name,
    passwordHash
  })
  try {
    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (err) {
    res.send(err)
  }
})
export default router
