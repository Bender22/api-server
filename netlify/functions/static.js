import '../../src/database/mongodb.js'
import express from 'express'
import serverless from 'serverless-http'
import * as path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
console.log()
app.use(express.static(__dirname))
app.get('/', (req, res) => {
  res.sendFile(__dirname)
})

export const handler = serverless(app)
