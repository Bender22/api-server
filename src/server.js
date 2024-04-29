import './database/mongodb.js'
import express from 'express'
import logger from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import eventRouter from './routes/eventRouter.js'

import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Undead-Api',
      version: '1.0.0'
    }
  },
  servers: [{ url: 'http://localhost:4000' }]
  // apis: [`${path.join(__dirname, './routes/*.js')}`]
}

// import errorsHandler from './middleware/errorsHandler.js'
// mongo.catch(e => {
//   console.log(e)
// }).finally()
const corsOptions = {
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}
const app = express()
app.use(cors())
// app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(process.cwd(), 'public')))
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'))
})
app.use('/api', eventRouter)

// app.use('/api', playerRouter)
// app.use(errorsHandler)

export default app
