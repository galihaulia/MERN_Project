require('dotenv').config()
const asyncHandler = require('../middleware/asyncHandler')

const {
  DB_TABLES: { DB_EVENTS },
} = require('../lib/const')

const { getFileUrl } = require('../lib/helper')

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
      message: 'Failed! Product has not been created.',
    })
  }
})

exports.addEventImage = asyncHandler(async (req, res, next) => {
  let file_url = await getFileUrl(req.file, req)

  return res.jsend.success({ url: file_url })
})
