import './database/mongodb.js'
import express from 'express'
import logger from 'morgan'
import helmet from 'helmet'
import userRouter from './router/userRouter.js'
import noteRouter from './router/noteRouter.js'
import errorsHandler from './middleware/errorsHandler.js'
// mongo.catch(e => {
//   console.log(e)
// }).finally()
const app = express()

app.use(helmet())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', userRouter)
app.use('/api', noteRouter)
app.use(errorsHandler)

export default app
