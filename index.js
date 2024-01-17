import app from './src/server.js'
const port = process.env.PORT

// app.set('port', port)
app.listen(port, () => {
  console.log(`Server running on http://127.0.0.1:${port}`)
})
