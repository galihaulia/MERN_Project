const http = require('http')
const app = require('./server/app')
const mongoose = require('mongoose')

const port = process.env.PORT || 4001
const server = http.createServer(app)

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

try {
  mongoose.connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log('MongooseDB connected')
} catch (error) {
  console.log(error)
}

server.listen(port, async () => {
  console.log(`Server running at port ${port}`)
  try {
    // await setRemainders()
  } catch (err) {
    console.log(err)
  }
})
