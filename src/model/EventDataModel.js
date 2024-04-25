import mongoose from 'mongoose'
import { schema } from 'eslint-plugin-n/lib/util/get-convert-path.js'
const Schema = mongoose.Schema

const EventDataSchema = new Schema({
  diff: Number,
  event_date: Date,
  event_time: Date,
  name: String,
  raid_name: String,
  players: [{
    type: schema.Types.ObjectId,
    ref: 'PlayerEvents'
  }]
})

EventDataSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
  }
})

export default mongoose.model('Events', EventDataSchema)
