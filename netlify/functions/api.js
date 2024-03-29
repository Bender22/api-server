import '../../src/database/mongodb.js'
import express from 'express'
import logger from 'morgan'
import helmet from 'helmet'
import eventRouter from '../../src/routes/eventRouter.js'
import serverless from 'serverless-http'

// import errorsHandler from './middleware/errorsHandler.js'
// mongo.catch(e => {
//   console.log(e)
// }).finally()

const app = express()

app.use(helmet())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/', eventRouter)
// app.use(errorsHandler)

export const handler = serverless(app)
