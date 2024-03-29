import './database/mongodb.js'
import express from 'express'
import logger from 'morgan'
import helmet from 'helmet'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import eventRouter from './routes/eventRouter.js'
// import * as path from 'path'
// import { fileURLToPath } from 'url'
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
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

const swaggerDocs = swaggerJsDoc(options)

// import errorsHandler from './middleware/errorsHandler.js'
// mongo.catch(e => {
//   console.log(e)
// }).finally()
const app = express()
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
app.use(helmet())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', eventRouter)

// app.use('/api', playerRouter)
// app.use(errorsHandler)

export default app
