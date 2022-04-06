const { tryCatchHandler } = require('../../middlewares')

module.exports = (service) => {
  const router = require('express').Router()

  router.get('/healthcheck',
    tryCatchHandler(async (req, res, next) => {
      const data = await service.healthCheck()
      res.status(200).send({ data })
    }))

  return router
}
