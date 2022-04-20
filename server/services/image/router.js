const { tryCatchHandler } = require('../../middlewares')

module.exports = (service) => {
  const router = require('express').Router()

  router.get('/healthcheck',
    tryCatchHandler(async (req, res, next) => {
      const data = await service.healthCheck()
      res.status(200).send({ data })
    }))

  router.post('/config/generate',
    tryCatchHandler(async (req, res, next) => {
      const { body } = req
      const data = await service.generateImageSettings(body)
      res.status(200).send({ data })
    }))    
    
  return router
}
