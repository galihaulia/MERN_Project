const express = require('express')
const router = express.Router()
const { authenticate } = require('../middleware/auth')
const { getAllUsers, getDataUser } = require('../controllers/user')

router.get('/users', authenticate, getAllUsers)
router.get('/user', authenticate, getDataUser)

module.exports = router
