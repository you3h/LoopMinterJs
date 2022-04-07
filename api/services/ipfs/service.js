const { logger } = require('../../utils')
const { name, version } = require('../../package.json')
const { BadRequestError } = require('../../types/errors')

const IPFSClient = require('./IPFSClient')

const SERVICE_NAME = '[IPFS_SERVICE]'

class IPFSService {
  constructor () {
    this.ipfsClient = new IPFSClient()
    this.apiKey = null
    this.secretKey = null
  }

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

  async pinataSetup (body) {
    const {
      apiKey,
      secretKey
    } = body

    if (!body || !apiKey || !secretKey) {
      logger.error(`${SERVICE_NAME}: Invalid data entry`)
      throw new BadRequestError();
    }

    this.apiKey = apiKey;
    this.secretKey = secretKey

    logger.info(`${SERVICE_NAME}: Pinata setup successful ${JSON.stringify({
      apiKey: this.apiKey ? 'Yes' : 'None',
      secretKey: this.secretKey ? 'Yes' : 'None'
    })}`)

    return {
      apiKey: this.apiKey ? 'Yes' : 'None',
      secretKey: this.secretKey ? 'Yes' : 'None'
    }
  }
  
  async getPinataSetup () {
    return {
      apiKey: this.apiKey ? 'Yes' : 'None',
      secretKey: this.secretKey ? 'Yes' : 'None'
    }
  }

  async getPinList () {
    const {
      ipfsClient,
      apiKey,
      secretKey
    } = this

    const res = await ipfsClient.getPinList(apiKey, secretKey)
    if (!res) { throw new BadRequestError() }

    const parsedRows = res.rows.map(data => {
      const {
        id,
        ipfs_pin_hash,
        metadata: {
          name,
          keyValues
        }
      } = data

      return {
        id,
        ipfs_pin_hash,
        name,
        keyValues
      }
    })

    return {
      count: res.count,
      rows: parsedRows
    }
  }

  async getListOfFileInsideFolder () {

  }
}

module.exports = IPFSService