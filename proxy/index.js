require('dotenv').config()
const httpProxy = require('express-http-proxy')
const express = require('express')

const {
  CHECK_PROXY,
  API_ROOT,
  IMAGE_GENERATOR_ROOT,
  DASHBOARD_ROOT
} = require('./constants')

const {
  PROXY_HOST,
  PROXY_PORT,
  API_FULL_HOST,
  IMAGE_GENERATOR_FULL_HOST,
  DASHBOARD_FULL_HOST
} = process.env

const app = express()

app.get(CHECK_PROXY, (req, res) => res.sendStatus(204))
app.use(IMAGE_GENERATOR_ROOT, httpProxy(IMAGE_GENERATOR_FULL_HOST))
app.use(API_ROOT, httpProxy(API_FULL_HOST))
app.use(DASHBOARD_ROOT, httpProxy(DASHBOARD_FULL_HOST))

app.listen(PROXY_PORT, PROXY_HOST, () =>
  console.log(`[PROXY] Started: running at ${PROXY_HOST}:${PROXY_PORT}`)
)
