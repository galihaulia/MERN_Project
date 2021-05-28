const express = require('express')
const cors = require('cors')
const jsend = require('jsend')
const path = require('path')
const router = express.Router()
const app = express()
const swaggerUI = require('swagger-ui-express')
const openApiDoc = require('./openApiDoc')
const bodyParser = require('body-parser')

const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const eventRoute = require('./routes/event')

const publicPath = path.join(__dirname, '../public')

app.use(cors())
app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(jsend.middleware)
app.use(express.static('uploads'))

app.use('/event/image', express.static('uploads/library/event/image'))

app.use('/', express.static(publicPath))

router.use(authRoute)
router.use(userRoute)
router.use(eventRoute)

app.use('/api', router)
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(openApiDoc.default()))
app.get('*', (req, res, next) => {
  res.status(200).json({
    message: 'Server MERN ON',
    status: 200,
  })
})

module.exports = app
