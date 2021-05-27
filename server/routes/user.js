const express = require('express')
const router = express.Router()
const { getAllUsers, getDataUser } = require('../controllers/user')

router.get('/users', getAllUsers)
router.get('/user', getDataUser)

module.exports = router
