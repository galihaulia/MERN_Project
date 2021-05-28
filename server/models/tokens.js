const mongoose = require('mongoose')

const TokensSchema = new mongoose.Schema({
  usersId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  token: String,
})

module.exports = mongoose.model('Tokens', TokensSchema)
