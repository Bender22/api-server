import mongoose from 'mongoose'
const schema = mongoose.Schema

// eslint-disable-next-line new-cap
const NoteDataSchema = new schema({
  title: String,
  content: String,
  important: Boolean,
  user: {
    type: schema.Types.ObjectId,
    ref: 'Users'
  },
  date: Date

})

NoteDataSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
  }
})

export default mongoose.model('Notes', NoteDataSchema)
