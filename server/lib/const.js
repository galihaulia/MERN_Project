// const Users = require('../models/users')
// const Tokens = require('../models/tokens')
// const Events = require('../models/events')

const { Users, Tokens, Events } = require('../models')

exports.DB_TABLES = {
  DB_USERS: Users,
  DB_TOKENS: Tokens,
  DB_EVENTS: Events,
}
