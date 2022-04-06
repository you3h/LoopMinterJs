const { createLogger, format, transports } = require('winston')
const { combine, timestamp, printf } = format

const loggerFormat = printf((logMessage) => {
  const { level, message, timestamp, stack, referenceId } = logMessage
  delete logMessage.level
  delete logMessage.timestamp
  return `${timestamp}: [${level}] ${stack ? '\n [Reference ID] ' + referenceId + '\n' + stack : message}`
})

const logger = createLogger({
  level: 'debug',
  format: combine(
    timestamp(),
    loggerFormat
  ),
  // * Since log files are available via Azure App Service Kudu,
  // * only console as transport will be used. No log files will be created using winston.
  // * Winston transport references: https://github.com/winstonjs/winston#transports
  transports: [new transports.Console()]
})

module.exports = logger
