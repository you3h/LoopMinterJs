const { API_PORT } = require('../types/constants')

// * The main config file for the application
const ApiServer = require('../apiServer')

const NFTService = require('../services/nft/service')
const IPFSService = require('../services/ipfs/service')

const nftRouter = require('../services/nft/router')
const ipfsRouter = require('../services/ipfs/router')

const { version } = require('../package.json')

const port = API_PORT || 8001

// * express app settings
const expressSettings = {
  'json spaces': 2
}

const nftService = new NFTService()
const ipfsService = new IPFSService()

// * API Configuration
const apis = [
  {
    name: 'NFT',
    endpoint: '/nft',
    service: nftService,
    router: nftRouter
  },
  {
    name: 'IPFS',
    endpoint: '/ipfs',
    service: ipfsService,
    router: ipfsRouter
  }
]

module.exports = {
  ApiServer,
  apis,
  expressSettings,
  port,
  version
}
