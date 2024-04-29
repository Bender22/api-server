import '../../src/database/mongodb.js'
import express from 'express'
import logger from 'morgan'
import helmet from 'helmet'
import eventRouter from '../../src/routes/eventRouter.js'
import serverless from 'serverless-http'
import cors from 'cors'
// import * as path from 'path'
// import { fileURLToPath } from 'url'
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// import errorsHandler from './middleware/errorsHandler.js'
// mongo.catch(e => {
//   console.log(e)
// }).finally()
const corsOptions = {
  origin: ['http://localhost:3000', 'https://usdamage.netlify.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}
const app = express()
app.use(cors(corsOptions))
// app.use(helmet({
//   crossOriginResourcePolicy: false
// }))
// app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/', eventRouter)
// app.use(errorsHandler)

export const handler = serverless(app)
