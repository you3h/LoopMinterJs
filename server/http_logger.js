const logger = require('morgan')

const logFormat = ':date[iso] :method :url :status :response-time ms - :res[content-length]'

module.exports = logger(logFormat)
