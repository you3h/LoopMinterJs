const { tryCatchHandler } = require('../../middlewares')

module.exports = (service) => {
  const router = require('express').Router()

  router.get('/healthcheck',
    tryCatchHandler(async (req, res, next) => {
      const data = await service.healthCheck()
      res.status(200).send({ data })
    }))

  router.post('/user/setup',
    tryCatchHandler(async (req, res, next) => {
      const { body } = req
      const data = await service.userSetup(body)
      res.status(200).send({ data })
    }))

  router.get('/user',
    tryCatchHandler(async (req, res, next) => {
      const data = await service.getUser()
      res.status(200).send({ data })
    }))

  router.post('/mint',
    tryCatchHandler(async (req, res, next) => {
      const { body } = req
      const data = await service.mintNFT(body)
      res.status(200).send({ data })
    }))

  router.post('/transfer',
    tryCatchHandler(async (req, res, next) => {
      const data = await service.transferNFT()
      res.status(200).send({ data })
    }))

  router.post('/mint/batch',
    tryCatchHandler(async (req, res, next) => {
      const data = await service.batchMintNFT()
      res.status(200).send({ data })
    }))

  router.post('/transfer/batch',
    tryCatchHandler(async (req, res, next) => {
      const data = await service.batchTransferNFT()
      res.status(200).send({ data })
    }))    

  return router
}
