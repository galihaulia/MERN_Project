const mongoose = require('mongoose')

const EventsSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    image: String,
    date: Date,
    usersId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('Events', EventsSchema)
