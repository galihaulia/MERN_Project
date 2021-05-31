const express = require('express')
const router = express.Router()
const { authenticate } = require('../middleware/auth')
const {
  getAllEvents,
  getDataEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  addEventImage,
} = require('../controllers/event')

const upload = require('../middleware/uploadEvent')

router.get('/events', authenticate, getAllEvents)
router.get('/event', authenticate, getDataEvent)
router.post('/event', authenticate, createEvent)
router.put('/event', authenticate, updateEvent)
router.delete('/event', authenticate, deleteEvent)
router.post('/event/image', upload.single('image'), addEventImage)

module.exports = router
