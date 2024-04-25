import mongoose from 'mongoose'
import { schema } from 'eslint-plugin-n/lib/util/get-convert-path.js'
const Schema = mongoose.Schema

const PlayerEventDataSchema = new Schema({
  role: String,
  guild: String,
  talent: String,
  clase: String,
  spec: String,
  name: String,
  guid_event: Number,
  damage_taken: Number,
  damage_done: Number,
  healing_done: Number,
  active_time: Number

})

PlayerEventDataSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
  }
})

export default mongoose.model('PlayerEvents', PlayerEventDataSchema)
