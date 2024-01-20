/* eslint-disable camelcase */
import
{ Router } from 'express'
import EventDataModel from '../model/EventDataModel.js'

const router = Router()
router.post('/event', (req, res) => {
  const { data } = req.body

  Promise.all(data.map(e => {
    const event = new EventDataModel({
      diff: e.diff,
      event_date: e.event_date,
      event_time: e.event_time,
      name: e.name,
      players: e.player_events
    })
    return event.save()
  })).then(result => {
    res.send({ updated: true, result })
  }).catch(err => {
    res.status(400).send({ updated: false, error: err })
  })
})

router.get('/event/:id', (req, res) => {
  const { id } = req.params
  EventDataModel.findById(id).then(result => {
    res.status(200).json(result)
  })
})
router.get('/events', (req, res) => {
  const { rowsPerPage } = req.body
  EventDataModel.find({}, {}, { limit: rowsPerPage || 10 }).then(result => {
    res.status(200).json(result)
  }).catch(err => {
    res.status(400).send({ updated: false, error: err })
  })
})

export default router
