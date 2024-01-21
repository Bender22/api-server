import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import express from 'express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Undead-Api',
      version: '1.0.0'
    }
  },
  servers: [{ url: 'http://localhost:4000' }],
  apis: ['../../src/routes/*.js']
}

const swaggerDocs = swaggerJsDoc(options)
const app = express()
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
