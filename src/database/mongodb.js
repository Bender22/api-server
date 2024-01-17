import mongoose from 'mongoose'

const connectionString = 'mongodb+srv://rahiguera:Roberto1022@cluster0.vua9dak.mongodb.net/data?retryWrites=true&w=majority'
//const connectionString = 'mongodb://127.0.0.1:27017/data'

// export function mongo () {
mongoose.connect(connectionString).then(() => {
  console.log('Connected to Mongodb')
}).catch(e => {
  console.error(e)
}).finally()
// }
