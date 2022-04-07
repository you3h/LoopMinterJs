const { tryCatchHandler } = require('../../middlewares')

module.exports = (service) => {
  const router = require('express').Router()

  router.get('/healthcheck',
    tryCatchHandler(async (req, res, next) => {
      const data = await service.healthCheck()
      res.status(200).send({ data })
    }))

  router.post('/setup',
    tryCatchHandler(async (req, res, next) => {
      const { body } = req
      const data = await service.pinataSetup(body)
      res.status(200).send({ data })
    }))    

  router.get('/setup',
    tryCatchHandler(async (req, res, next) => {
      const data = await service.getPinataSetup()
      res.status(200).send({ data })
    }))        

  router.get('/pin/list',
    tryCatchHandler(async (req, res, next) => {
      const data = await service.getPinList()
      res.status(200).send({ data })
    }))    

  router.get('/:cid/files',
    tryCatchHandler(async (req, res, next) => {
      const { cid } = req.params
      const data = await service.getPinList(cid)
      res.status(200).send({ data })
    }))  
    
  return router
}
