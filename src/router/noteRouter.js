import express from 'express'
import NoteDataModel from '../model/NoteDataModel.js'
import UserDataModel from '../model/UserDataModel.js'

// import handleError from '../middleware/errorsHandler.js'
const router = express.Router()
// import dotenv from 'dotenv'
// dotenv.config()

const secret = {
  secret: process.env.SECRET,
  algorithms: ['HS256']
}

router.get('/note', (req, res) => {
  console.log(req.body)
  // let notes = {}
  // if (req.body.id) {
  //
  //   notes = await NoteDataModel.findById({ _id: req.body.id }).populate('user', {
  //     username: 1,
  //     name: 1,
  //     date: 1
  //   })
  // } else if (!req.body.id) {

  NoteDataModel.find().populate('user', {
    username: 1,
    name: 1,
    date: 1
  }).then((notes) => {
    res.json(notes)
  }).catch(err => {
    res.status(401).send(err)
  })
  // }
})

router.get('/note/:id', (req, res) => {
  const id = req.params.id

  NoteDataModel.findById(id).populate('user', {
    username: 1,
    name: 1,
    date: 1
  }).then(notes => {
    res.status(200).json(notes)
  }).catch(err => {
    res.status(401).json(err)
  })
})

router.post('/note', async (req, res) => {
  const { title, content, important = false } = req.body
  const userId = req.user.id
  console.log(userId)
  const note = new NoteDataModel({
    title,
    content,
    important,
    user: userId,
    date: new Date()
  })
  const createUser = await UserDataModel.findById(userId)

  try {
    const savedNote = await note.save()
    createUser.notes = await createUser.notes.concat(savedNote._id)
    createUser.save()
    res.status(201).json(savedNote)
  } catch (err) {
    res.send(err)
  }
})

router.put('/note/:id', (req, res) => {
  const { title, content, important } = req.body
  NoteDataModel.updateOne({ _id: req.params.id }, { title, content, important })
    .then(result => {
      res.send({ updated: true, result: result })
    }).catch(err => {
      res.send({ updated: false, error: err })
    })
})

router.put('/note', (req, res) => {
  NoteDataModel.updateOne({ _id: req.body.id }, req.body)
    .then(result => {
      res.send({ updated: true, result: result })
    }).catch(err => {
      res.send({ updated: false, error: err })
    })
})

router.delete('/note', (req, res) => {
  const { id } = req.body
  NoteDataModel.deleteOne({ _id: id }).then((result) => {
    console.log('Elemento borrado')
    res.send('Se borró la Nota')
  }).catch(err => {
    console.log(err)
    res.send(err)
  })
})

export default router
