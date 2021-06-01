require('dotenv').config()
const asyncHandler = require('../middleware/asyncHandler')

const {
  DB_TABLES: { DB_EVENTS },
} = require('../lib/const')

const { getFileUrl, updateEventImage, deleteFile } = require('../lib/helper')

exports.getAllEvents = asyncHandler(async (req, res, next) => {
  const events = await DB_EVENTS.find({}).populate('usersId')

  let data = {
    sumOfEvent: 0,
    events: [],
  }

  if (events) {
    data.sumOfEvent = events.length
    data.events = events.map((event) => {
      let firstName = event.usersId.firstName ? event.usersId.firstName : ''
      let lastName = event.usersId.lastName ? ' ' + event.usersId.lastName : ''
      let fullName = firstName + lastName
      return {
        id: event.id,
        title: event.title,
        description: event.description,
        price: event.price,
        image: event.image,
        author: fullName,
      }
    })
  }

  return res.jsend.success(data)
})

exports.getDataEvent = asyncHandler(async (req, res, next) => {
  const { event_id } = req.query

  const event = await DB_EVENTS.findById(event_id).populate('usersId')

  if (event) {
    let firstName = event.usersId.firstName ? event.usersId.firstName : ''
    let lastName = event.usersId.lastName ? ' ' + event.usersId.lastName : ''
    let fullName = firstName + lastName
    let data = {
      id: event.id,
      title: event.title,
      description: event.description,
      price: event.price,
      image: event.image,
      author: fullName,
    }

    return res.jsend.success(data)
  } else {
    return res.status(400).jsend.error({
      message: 'Event not found.',
    })
  }
})

exports.createEvent = asyncHandler(async (req, res, next) => {
  const { title, description, price, image } = req.body
  const { id } = req.user

  try {
    const event = await DB_EVENTS.create({
      usersId: id,
      title: title,
      description: description,
      price: price,
      image: image ? image : 'default',
    })

    return res.jsend.success({
      message: 'Event has been created.',
    })
  } catch (error) {
    return res.status(400).jsend.error({
      message: 'Failed! Event has not been created.',
    })
  }
})

exports.updateEvent = asyncHandler(async (req, res, next) => {
  const now = Date()
  const { event_id, title, description, price, images } = req.body

  const event = await DB_EVENTS.findById(event_id)

  if (event) {
    if (images) {
      await updateEventImage(req, res, event, images)
    }

    try {
      event.title = title
      event.description = description
      event.price = price
      event.updatedAt = now
      await event.save()

      return res.jsend.success({
        message: 'Event has been updated.',
      })
    } catch (error) {
      return res.status(400).jsend.error({
        message: 'Failed! Event has not been updated.',
      })
    }
  }
})

exports.deleteEvent = asyncHandler(async (req, res, next) => {
  const { event_id } = req.body

  const event = await DB_EVENTS.findById(event_id)

  if (event) {
    await deleteFile(req, event.image)

    const deleteEvent = await DB_EVENTS.findByIdAndDelete(event_id)

    return res.jsend.success({
      message: 'Event has been deleted.',
    })
  }
})

exports.addEventImage = asyncHandler(async (req, res, next) => {
  let file_url = await getFileUrl(req.file, req)

  return res.jsend.success({ url: file_url })
})
