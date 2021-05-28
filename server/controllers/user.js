require('dotenv').config()
const asyncHandler = require('../middleware/asyncHandler')

const {
  DB_TABLES: { DB_USERS },
} = require('../lib/const')

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await DB_USERS.find({})

  let data = []
  if (users) {
    for (user of users) {
      let obj = {
        id: user._id,
        firsrName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }

      data.push(obj)
    }
  }

  return res.jsend.success(data)
})

exports.getDataUser = asyncHandler(async (req, res, next) => {
  const { user_id } = req.query
  const { id } = req.user

  let userId
  if (user_id) {
    userId = user_id
  } else {
    userId = id
  }

  const user = await DB_USERS.findById(userId)

  let data
  if (user) {
    data = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }
  } else {
    return res.status(400).jsend.error({
      message: 'User not found',
    })
  }

  return res.jsend.success(data)
})
