const express = require('express')
const cors = require('cors')
const router = express.Router()
const app = express()
const swaggerUI = require('swagger-ui-express')
const openApiDoc = require('./openApiDoc')

const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')

app.use(cors())
app.use(express.json())

router.use(authRoute)
router.use(userRoute)

app.use('/api', router)
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(openApiDoc.default()))
app.get('*', (req, res, next) => {
  res.status(200).json({
    message: 'Server MERN ON',
    status: 200,
  })
})

module.exports = app
