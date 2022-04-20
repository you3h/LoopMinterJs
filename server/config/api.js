const { API_PORT } = require('../types/constants')

// * The main config file for the application
const ApiServer = require('../apiServer')

const NFTService = require('../services/nft/service')
const ImageService = require('../services/image/service')

const nftRouter = require('../services/nft/router')
const imageRouter = require('../services/image/router')

const { version } = require('../package.json')

const port = API_PORT || 8000

// * express app settings
const expressSettings = {
  'json spaces': 2
}

const nftService = new NFTService()
const imageService = new ImageService()

// * API Configuration
const apis = [
  {
    name: 'NFT',
    endpoint: '/nft',
    service: nftService,
    router: nftRouter
  },
  {
    name: 'Image',
    endpoint: '/image',
    service: imageService,
    router: imageRouter
  }
]

module.exports = {
  ApiServer,
  apis,
  expressSettings,
  port,
  version
}
