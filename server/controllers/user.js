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

  return res.status(200).json(data)
})

exports.getDataUser = asyncHandler(async (req, res, next) => {
  const { user_id } = req.query

  const user = await DB_USERS.findById(user_id)

  let data
  if (user) {
    data = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }
  } else {
    return res.status(400).json({
      message: 'User not found.',
    })
  }

  return res.status(200).json(data)
})
