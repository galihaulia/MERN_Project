require('dotenv').config()
const jwt = require('jsonwebtoken')
// const Joi = require('@hapi/joi');
const SSL = process.env.SSL
const secretKey = process.env.JWT_SECRET
const expired = process.env.JWT_EXPIRE
const fs = require('fs')
const asyncHandler = require('../middleware/asyncHandler')

const {
  DB_TABLES: { DB_USERS, DB_TOKENS, DB_EVENTS },
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
  // const find = await DB_TOKENS.find(condition)
  // if (find) {
  //   console.log('update')
  //   return MODEL.updateOne(condition, values)
  // }
  // console.log('not found')
  // return MODEL.create(values)
  return MODEL.find(condition).then((result) => {
    if (result.length != 0) {
      console.log('update')
      return MODEL.updateOne(condition, values)
    }
    console.log('not found')
    return MODEL.create(values)
  })
}

exports.getFileUrl = async (file, req) => {
  const [header] =
    SSL === 'true' ? req.headers.host.split(':') : [req.headers.host]
  const protocol = SSL === 'true' ? 'https' : 'http'
  let path = file.path.replace(/\\/g, '/').split('uploads/library/')
  let url = protocol + '://' + header + '/' + path[1]
  return url
}

exports.getFilePath = async (req, fileUrl) => {
  const [header] =
    SSL === 'true' ? req.headers.host.split(':') : [req.headers.host]
  const protocol = SSL === 'true' ? 'https' : 'http'
  let url = protocol + '://' + header
  let path = fileUrl.replace(/\\/g, '/').split(url)
  const uploadPath = 'uploads/library'

  return uploadPath + path[1]
}

exports.deleteFile = async (req, fileUrl) => {
  const deletePath = await this.getFilePath(req, fileUrl)
  fs.unlink(deletePath, (err) => {
    if (err) {
      return
    }
  })
}

exports.updateEventImage = async (req, res, event, images) => {
  const now = Date()
  const { image, id } = event

  try {
    if (images instanceof Array) {
      for (img of images) {
        if (img.image_name == image && img.deletion == 1) {
          await this.deleteFile(req, image)
        } else if (img.image_name != image && img.deletion == 2) {
          let value = {
            image: img.image_name,
            updatedAt: now,
          }
          await DB_EVENTS.findByIdAndUpdate(id, value)
        }
      }
    }
  } catch (error) {
    res.status(404).jsend.error({
      message: 'Failed! Image Event has not been updated.',
    })
  }
}
