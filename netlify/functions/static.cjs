require('../../src/database/mongodb.js')
const express = require('express')
const serverless = require('serverless-http')
const path = require('path')
// import { fileURLToPath } from 'url'
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
const app = express()
app.use(express.static('/.netlify/public'))
app.get('/', (req, res) => {
  res.sendFile('/.netlify/public/index.html')
})

export const handler = serverless(app)
