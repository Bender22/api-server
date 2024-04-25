import mongoose from 'mongoose'

const Schema = mongoose.Schema

const PlayerDataSchema = new Schema({
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
  active_time: Number,
  event: [{
    type: Schema.Types.ObjectId,
    ref: 'Events'
  }]
})

PlayerDataSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
  }
})

export default mongoose.model('Players', PlayerDataSchema)
