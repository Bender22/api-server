/* eslint-disable camelcase */
import
{ Router } from 'express'
import EventDataModel from '../model/EventDataModel.js'
import mongoose from 'mongoose'
import PlayerEventDataModel from '../model/PlayerEventDataModel.js'

const router = Router()

// router.use('/api-docs', swaggerUI.serve)
// router.get('/api-docs', swaggerUI.setup(swaggerDocs))
router.post('/event', (req, res) => {
  const { data } = req.body
  const { player_events } = data
  if (Array.isArray(data)) {
    insertArray(data, player_events, req, res)
  } else if (typeof data === 'object') {
    insertObject(data, player_events, req, res)
  }
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
  const { date, dificult, zone, boss, limit = 10, page = 1, clase, role, guild, player } = req.query
  const skip = limit * (page - 1)
  if (date) {
    filter.date = Date.parse(date)
  }
  if (dificult) {
    filter.diff = parseInt(dificult)
  }
  if (zone) {
    filter.zone = zone
  }
  if (boss) {
    filter.bossName = boss
  }
  if (clase) {
    filter.players = { $elemMatch: { 'player_info.class': clase.toUpperCase() } }
  }
  if (role) {
    filter.players = { $elemMatch: { 'player_info.role': role.toUpperCase() } }
  }
  if (guild) {
    filter.players = { $elemMatch: { 'player_info.guild': guild.replace(/\b\w/g, c => c.toUpperCase()) } }
  }
  if (player) {
    filter.players = { $elemMatch: { 'player_info.name': player.replace(/\b\w/g, c => c.toUpperCase()) } }
  }
  let filterArray = []
  if (filter !== {}) { filterArray = Object.keys(filter).map(clave => ({ [clave]: filter[clave] })).filter(e => !!e) }
  console.log(filterArray)
  EventDataModel.aggregate([
    {
      $match: {}
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
            cond: {
              $and: [
                clase ? { $eq: ['$$player_event.player_info.class', clase.toUpperCase()] } : {},
                role ? { $eq: ['$$player_event.player_info.role', role.toUpperCase()] } : {},
                guild ? { $eq: ['$$player_event.player_info.guild', guild.replace(/\b\w/g, c => c.toUpperCase())] } : {},
                player ? { $eq: ['$$player_event.player_info.name', player.replace(/\b\w/g, c => c.toUpperCase())] } : {}
              ]
            }
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
    res.status(200).send(e)
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
router.post('/events', (req, res) => {
  const filter = {}
  const { date, diff, zone, boss, limit = 10, page = 1, clase, role, guild, player } = req.body
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
    filter.bossName = boss
  }
  if (clase) {
    filter.players = { $elemMatch: { 'player_info.class': clase.toUpperCase() } }
  }
  if (role) {
    filter.players = { $elemMatch: { 'player_info.role': role.toUpperCase() } }
  }
  if (guild) {
    filter.players = { $elemMatch: { 'player_info.guild': guild.replace(/\b\w/g, c => c.toUpperCase()) } }
  }
  if (player) {
    filter.players = { $elemMatch: { 'player_info.name': player.replace(/\b\w/g, c => c.toUpperCase()) } }
  }
  let filterArray = []
  if (filter !== {}) { filterArray = Object.keys(filter).map(clave => ({ [clave]: filter[clave] })).filter(e => !!e) }
  console.log(filterArray)
  EventDataModel.aggregate([
    {
      $match: {}
    },
    {
      $project: {
        diff: 1,
        event_date: 1,
        event_time: 1,
        name: 1,
        bossName: {
          $filter: {
            input: 'name',
            as: 'boss_name',
            cond: {
              $and: [
                boss ? { $eq: ['$$boss_name', clase.toUpperCase()] } : {}
              ]
            }
          }
        },
        players: {
          $filter: {
            input: '$players',
            as: 'player_event',
            cond: {
              $and: [
                clase ? { $eq: ['$$player_event.player_info.class', clase.toUpperCase()] } : {},
                role ? { $eq: ['$$player_event.player_info.role', role.toUpperCase()] } : {},
                guild ? { $eq: ['$$player_event.player_info.guild', guild.replace(/\b\w/g, c => c.toUpperCase())] } : {},
                player ? { $eq: ['$$player_event.player_info.name', player.replace(/\b\w/g, c => c.toUpperCase())] } : {}
              ]
            }
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
    res.status(201).send(e)
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
  EventDataModel.find().populate('PlayerEvents').exec()
    .then(result => {
      res.status(200).json(result)
    }).catch(err => {
      res.status(400).send({ updated: false, error: err })
    })
})

const insertArray = (data, player_events, req, res) => {
  Promise.all(player_events.map(e => {
    const {
      details,
      players_info
    } = e
    const {
      name,
      role,
      guild,
      talent,
      spec
    } = details
    const {
      guid_event,
      damage_taken,
      damage_done,
      healing_done,
      active_time
    } = players_info
    const clase = details.class
    const event = new PlayerEventDataModel({
      role,
      guild,
      talent,
      clase,
      spec,
      name,
      guid_event,
      damage_taken,
      damage_done,
      healing_done,
      active_time
    })
    return event.save()
  })).then(r => {
    Promise.all(data.map(e => {
      const listID = r.reduce(ele => {
        return ele.guid === e.guid
      })
      const event = new EventDataModel({
        diff: e.diff,
        event_date: e.event_date,
        event_time: e.event_time,
        name: e.name,
        players: listID
      })
      return event.save()
    })).then(async result => {
      res.send({
        updated: true,
        result
      })
      await mongoose.connection.close()
    }).catch(err => {
      res.status(400).send({
        updated: false,
        error: err
      })
    })
  })
  // Promise.all(data.map(e => {
  //   const event = new EventDataModel({
  //     diff: e.diff,
  //     event_date: e.event_date,
  //     event_time: e.event_time,
  //     name: e.name,
  //     players: e.player_events
  //   })
  //   return event.save()
  // })).then(async result => {
  //   res.send({
  //     updated: true,
  //     result
  //   })
  //   await mongoose.connection.close()
  // }).catch(err => {
  //   res.status(400).send({
  //     updated: false,
  //     error: err
  //   })
  // })
}

const insertObject = (data, player_events, req, res) => {
  const event = new EventDataModel({
    diff: data.diff,
    event_date: data.event_date,
    event_time: data.event_time,
    name: data.name,
    players: data.player_events
  })
  event.save().then(async result => {
    res.send({
      updated: true,
      result
    })
    await mongoose.connection.close()
  }).catch(err => {
    res.status(400).send({
      updated: false,
      error: err
    })
  })
}

export default router
