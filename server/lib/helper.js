require('dotenv').config()
const jwt = require('jsonwebtoken')
// const Joi = require('@hapi/joi');
const SSL = process.env.SSL
const secretKey = process.env.JWT_SECRET
const expired = process.env.JWT_EXPIRE
const asyncHandler = require('../middleware/asyncHandler')

const {
  DB_TABLES: { DB_USERS, DB_TOKENS },
} = require('../lib/const')

exports.generateTokens = async (user) => {
  const token = jwt.sign(
    {
      id: user.id,
    },
    secretKey,
    {
      expiresIn: expired,
    },
  )
  return token
}

exports.upsert = async (values, condition, MODEL) => {
  const find = await DB_TOKENS.findById(condition)
  if (find) {
    console.log('update')
    return MODEL.updateOne(condition, values)
  }
  console.log('not found')
  return MODEL.create(values)
  // return MODEL.findOne({ condition }).then((result) => {
  //   if (result) {
  //     console.log('update')
  //     return MODEL.updateOne(condition, values)
  //   }
  //   console.log('not found')
  //   return MODEL.create(values)
  // })
}

exports.getFileUrl = async (file, req) => {
  const [header] =
    SSL === 'true' ? req.headers.host.split(':') : [req.headers.host]
  const protocol = SSL === 'true' ? 'https' : 'http'
  let path = file.path.replace(/\\/g, '/').split('uploads/library/')
  let url = protocol + '://' + header + '/' + path[1]
  return url
}
