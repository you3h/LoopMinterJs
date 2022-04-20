// * Constants
const { SERVER_NAME } = require('./types/constants')

const { logger } = require('./utils')

const {
  ApiServer,
  apis,
  port,
  settings,
  version
} = require(`./config/api`)

const apiServer = new ApiServer({ apis, settings, port })

process.on('SIGTERM', async () => {
  logger.info(`${SERVER_NAME} SIGTERM signal received`)
  await apiServer.stop()
  process.exit(1)
})

process.on('SIGINT', async () => {
  logger.info(`${SERVER_NAME} SIGINT (Ctrl-C) received`)
  await apiServer.stop()
  process.exit(2)
})

// * catch uncaught exceptions, trace, then exit normally
process.on('uncaughtException', async (e) => {
  logger.error(`${SERVER_NAME} Uncaught Exception...`)
  logger.error(e.stack)
  await apiServer.stop()
  process.exit(99)
})

logger.info(`${SERVER_NAME} version ${version} starting`)
apiServer.start()
