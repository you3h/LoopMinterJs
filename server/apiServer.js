const express = require('express')
const cors = require('cors')

// * Middlewares
const { errorHandler } = require('./middlewares')

// * Utils
const { logger } = require('./utils')

// * Constants
const { SERVER_NAME } = require('./types/constants')

class ApiServer {
  constructor ({ apis, settings, port }) {
    // * apiServer is based on an express server
    this.app = express()
    this.apis = apis
    this.settings = settings
    this.port = port
  }

  // * Start the API server
  async start () {
    const { app, settings, apis, port } = this

    // * Apply all settings
    for (const key in settings) {
      app.set(key, settings[key])
    }

    // * Add CORS set up
    const corsMiddleware = cors({
      origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:8000'],
      credentials: true,
      preflightContinue: false
    })

    app.use(corsMiddleware)
    app.options(corsMiddleware)

    app.use(express.json())

    // * Start services and mount all the APIs
    for (const api of apis) {
      const { name, router, endpoint, service } = api
      // * Start the API service
      if (service) {
        await service.start()
        logger.info(`[${name} SERVICE] started`)
      }

      // * Mount the API router
      if (router) {
        app.use(endpoint, router(service))
      }
    }

    // * Mount generic error handler.
    app.use(errorHandler)

    // * listen to requests on PORT
    app.listen(port, () => logger.info(`${SERVER_NAME} started, listening at port ${port}`))
  }

  async stop () {
    const { apis } = this

    for (const api of apis) {
      const { name, service } = api

      // * Initialize the API service
      await service.stop()
      logger.info(`[${name} service] stopped`)
    }
    logger.info(`${SERVER_NAME} stopped`)
  }
}

module.exports = ApiServer
