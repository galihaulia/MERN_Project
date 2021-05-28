const express = require('express')
const router = express.Router()
const { authenticate } = require('../middleware/auth')
const {
  getAllEvents,
  createEvent,
  addEventImage,
} = require('../controllers/event')

const upload = require('../middleware/uploadEvent')

router.get('/events', authenticate, getAllEvents)
router.post('/event', authenticate, createEvent)
router.post('/event/image', upload.single('image'), addEventImage)

module.exports = router
