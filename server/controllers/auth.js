require('dotenv').config()
const asyncHandler = require('../middleware/asyncHandler')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

const {
  DB_TABLES: { DB_USERS, DB_TOKENS },
} = require('../lib/const')

const {
  // registerValidation,
  // loginValidation,
  generateTokens,
  upsert,
} = require('../lib/helper')

exports.register = asyncHandler(async (req, res, next) => {
  const { first_name, last_name, email, password } = req.body

  const cekEmail = await DB_USERS.findOne({
    email: email,
  })

  if (!cekEmail) {
    const hashPassword = bcrypt.hashSync(password, salt)

    try {
      const user = await DB_USERS.create({
        firstName: first_name,
        lastName: last_name,
        email: email,
        password: hashPassword,
      })

      const token = await generateTokens(user)

      const createToken = await DB_TOKENS.create({
        usersId: user.id,
        token: token,
      })

      return res.jsend.success({
        message: 'User has been created',
        token: token,
      })
    } catch (error) {
      return res.status(400).jsend.error({
        message: 'Something wrong.',
      })
    }
  } else {
    return res.status(400).jsend.error({
      message: 'Email already exist.',
    })
  }
})

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  const user = await DB_USERS.findOne({
    email: email,
  })

  let token
  if (user) {
    const checkPassword = bcrypt.compareSync(password, user.password)
    if (checkPassword) {
      token = await generateTokens(user)
      const upSert = await upsert(
        {
          usersId: user.id,
          token: token,
        },
        { usersId: user.id },
        DB_TOKENS,
      )
    } else {
      return res.status(400).jsend.error({
        message: 'Password not match',
      })
    }
  } else {
    return res.status(400).jsend.error({
      message: 'User not found',
    })
  }

  return res.jsend.success({
    token: token,
  })
})
