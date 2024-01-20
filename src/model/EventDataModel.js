import mongoose from 'mongoose'
const Schema = mongoose.Schema

const EventDataSchema = new Schema({
  all_damage: Number,
  all_healing: Number,
  diff: Number,
  event_date: Date,
  event_time: Date,
  name: String,
  players: []
})

EventDataSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
  }
})

export default mongoose.model('Events', EventDataSchema)
