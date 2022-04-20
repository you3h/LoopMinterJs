const {
  ServerError,
  InternalServerError
} = require('../types/errors')

const { logger } = require('../utils')

const convertToHTTPError = (error) => {
  if (error instanceof ServerError) {
    logger.error(error)
    return error
  } else {
    const httpError = new InternalServerError()

    // * To make the Reference ID searchable in Azure App Insights Logs (Analytics)
    // * Add the Reference ID on the error message
    error.message = `[Reference ID] ${httpError.referenceId} ${error.message}`

    // * If error is not an instance of Q-Template defined errors
    // * (e.g. Errors from dependency libraries, Javascript Errors, etc),
    // * add reference ID
    error.referenceId = httpError.referenceId

    logger.error(error)
    return httpError
  }
}

const tryCatchHandler = middleware => (req, res, next) => {
  middleware(req, res, next).catch((error) => next(error))
}

// * Error handler middleware defined in express documentation
// * Reference: https://expressjs.com/en/guide/error-handling.html
const errorHandler = (err, req, res, next) => {
  const error = convertToHTTPError(err)

  res.status(error.statusCode).json({ error })
}

module.exports = {
  errorHandler,
  tryCatchHandler
}
