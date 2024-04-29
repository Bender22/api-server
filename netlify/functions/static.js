import '../../src/database/mongodb.js'
import express from 'express'
import serverless from 'serverless-http'
import * as path from 'path'
// import { fileURLToPath } from 'url'
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
const app = express()
app.use(express.static(path.join(process.cwd(), 'public')))
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public'))
})

export const handler = serverless(app)
