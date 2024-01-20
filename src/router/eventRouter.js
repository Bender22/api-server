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
  EventDataModel.findById(id).exec()
    .then(result => {
      res.status(200).json(result)
    }).catch(err => {
      res.status(400).send({ updated: false, error: err })
    })
})
router.get('/events', (req, res) => {
  const filter = {}
  const { date, diff, zone, name, limit = 10, page = 1, clase } = req.query
  const skip = limit * (page - 1)
  if (date) {
    filter.date = Date.parse(date)
  }
  if (diff) {
    filter.diff = parseInt(diff)
  }
  if (zone) {
    filter.zone = zone
  }
  if (zone) {
    filter.name = name
  }
  let filterArray = []
  if (filter !== {}) { filterArray = Object.keys(filter).map(clave => ({ [clave]: filter[clave] })) }
  console.log(filterArray)
  EventDataModel.aggregate([
    {
      $match: {
        $and: [
          { players: { $elemMatch: { 'player_info.class': clase.toUpperCase() } } },
          ...filterArray
        ]
      }
    },
    {
      $project: {
        diff: 1,
        event_date: 1,
        event_time: 1,
        name: 1,
        players: {
          $filter: {
            input: '$players',
            as: 'player_event',
            cond: { $eq: ['$$player_event.player_info.class', clase] }
          }
        }
      }
    },
    {
      $skip: skip
    },
    {
      $limit: limit
    }
  ]).exec().then(e => {
    res.send(e)
  })
  //
  // EventDataModel.find(filter, null, { limit, skip }).exec()
  //   .then(result => {
  //     if (clase) {
  //       const classFilter = result.map(e => {
  //         return {
  //           diff: e.diff,
  //           event_date: e.event_date,
  //           event_time: e.event_time,
  //           name: e.name,
  //           players: e.players.filter(ele => {
  //             return ele.player_info.class.toLowerCase() === clase.toLowerCase()
  //           })
  //         }
  //       })
  //       res.json(classFilter)
  //     } else {
  //       res.status(200).json(result)
  //     }
  //   }).catch(err => {
  //     res.status(400).send({ updated: false, error: err })
  //   })
})

router.get('/event', (req, res) => {
  EventDataModel.find().exec()
    .then(result => {
      res.status(200).json(result)
    }).catch(err => {
      res.status(400).send({ updated: false, error: err })
    })
})

export default router
