const express = require('express')
const app = express()
const path = require('path')
const publicPath = path.join(__dirname, '../client/build')

const httpLogger = require('./http_logger')

app.set('json spaces', 2)
app.use(httpLogger)

// * redirect js traffic to zipped files
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'
  res.set('Content-Encoding', 'gzip')
  res.set('Content-Type', 'text/javascript')
  next()
})

app.use('/', express.static(publicPath))

// Always return the main index.html, so react-router renders the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(publicPath, 'index.html'))
})

module.exports = app
