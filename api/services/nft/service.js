const { logger } = require('../../utils')
const { name, version } = require('../../package.json')

const SERVICE_NAME = '[NFT_SERVICE]'

class NFTService {
  async start () {
    // * Do Nothing
  }

  async stop () {
    // * Do Nothing
  }
  
  async healthCheck () {
    return {
      name,
      version,
      service: SERVICE_NAME,
      time: new Date().toISOString()
    }
  }
}

module.exports = NFTService