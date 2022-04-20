const { v4: uuidv4 } = require('uuid')

class ServerError extends Error {
  constructor (referenceId = null) {
    super()
    this.referenceId = referenceId || uuidv4()
  }
}

class InvalidParameterError extends ServerError {
  constructor (referenceId = null) {
    super(referenceId)
    this.name = 'InvalidParameter'
    this.message = 'Invalid Parameter Supplied'
  }
}

class HttpError extends ServerError {
  constructor (referenceId = null) {
    super(referenceId)
    this.statusCode = 400
    this.name = 'HttpError'
    this.message = 'HTTP-related Error'
  }
}

class BadRequestError extends HttpError {
  constructor (referenceId = null) {
    super(referenceId)
    this.statusCode = 400
    this.name = 'BadRequestError'
    this.message = 'Received data is either empty or invalid'
  }
}

class UnauthorizedError extends HttpError {
  constructor (referenceId = null) {
    super(referenceId)
    this.statusCode = 401
    this.name = 'UnauthorizedError'
    this.message = 'Request requires user authentication'
  }
}

class ForbiddenError extends HttpError {
  constructor (referenceId = null) {
    super(referenceId)
    this.statusCode = 403
    this.name = 'ForbiddenError'
    this.message = 'Request not allowed'
  }
}

class NotFoundError extends HttpError {
  constructor (referenceId = null) {
    super(referenceId)
    this.statusCode = 404
    this.name = 'NotFoundError'
    this.message = 'Requested resource not found'
  }
}

class InternalServerError extends HttpError {
  constructor (referenceId = null) {
    super(referenceId)
    this.statusCode = 500
    this.name = 'InternalServerError'
    this.message = 'Internal server error'
  }
}

class NotImplementedError extends HttpError {
  constructor (referenceId = null) {
    super(referenceId)
    this.statusCode = 501
    this.name = 'NotImplementedError'
    this.message = 'Not Implemented'
  }
}

class InvalidConfigurationError extends ServerError {
  constructor (referenceId = null) {
    super(referenceId)
    this.name = 'InvalidConfigurationError'
    this.message = 'A value in the config file you provided is invalid'
  }
}

class InvalidDataError extends BadRequestError {
  constructor (referenceId = null) {
    super(referenceId)
    this.name = 'InvalidDataError'
    this.message = 'Received Data is either empty or invalid'
  }
}

module.exports = {
  HttpError,
  ForbiddenError,
  InternalServerError,
  InvalidConfigurationError,
  InvalidDataError,
  InvalidParameterError,
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ServerError,
  NotImplementedError
}
