const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Events' }],
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('Users', UsersSchema)
