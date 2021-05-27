require('dotenv').config()
const asyncHandler = require('../middleware/asyncHandler')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

const {
  DB_TABLES: { DB_USERS },
} = require('../lib/const')

exports.register = asyncHandler(async (req, res, next) => {
  const { first_name, last_name, email, password } = req.body

  const cekEmail = await DB_USERS.findOne({ email })

  if (!cekEmail) {
    const hashPassword = bcrypt.hashSync(password, salt)

    try {
      const user = await DB_USERS.create({
        firstName: first_name,
        lastName: last_name,
        email: email,
        password: hashPassword,
      })

      return res.status(200).json({
        message: 'User has been created',
        data: user,
      })
    } catch (error) {
      return res.status(400).json({
        message: 'Something wrong.',
      })
    }
  } else {
    return res.status(400).json({
      message: 'Email already exist.',
    })
  }
})
