import '../../src/database/mongodb.js'
import express from 'express'
import serverless from 'serverless-http'
import * as path from 'path'
// import { fileURLToPath } from 'url'
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
const app = express()
app.use(express.static('/public/'))
app.get('/', (req, res) => {
  res.sendFile('/public/index.html')
})

export const handler = serverless(app)
