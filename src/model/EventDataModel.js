import mongoose from 'mongoose'
const Schema = mongoose.Schema

const EventDataSchema = new Schema({
  diff: Number,
  event_date: Date,
  event_time: Date,
  name: String,
  raid_name: String,
  players: []
})

EventDataSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
  }
})

export default mongoose.model('Events', EventDataSchema)
