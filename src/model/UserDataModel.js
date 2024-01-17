import mongoose from 'mongoose'

const schema = mongoose.Schema

// eslint-disable-next-line new-cap
const UserDataSchema = new schema({
  username: String,
  name: String,
  passwordHash: String,
  notes: [{
    type: schema.Types.ObjectId,
    ref: 'Notes'
  }]
})

UserDataSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

export default mongoose.model('Users', UserDataSchema)
