import '../../src/database/mongodb.js'
import express from 'express'
import logger from 'morgan'
import helmet from 'helmet'
import eventRouter from '../../src/routes/eventRouter.js'
import serverless from 'serverless-http'
import path from 'path'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
// import errorsHandler from './middleware/errorsHandler.js'
// mongo.catch(e => {
//   console.log(e)
// }).finally()
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Undead-Api',
      version: '1.0.0'
    }
  },
  servers: [{ url: 'http://localhost:4000' }],
  apis: [`${path.join(__dirname, '../../src/routes/*.js')}`]
}

const swaggerDocs = swaggerJsDoc(options)
const app = express()

app.use(helmet())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
app.use('/api/', eventRouter)
// app.use(errorsHandler)

export const handler = serverless(app)
