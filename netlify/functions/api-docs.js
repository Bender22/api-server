import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import express from 'express'
import serverless from 'serverless-http'
const app = express()
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

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
export const handler = serverless(app)
