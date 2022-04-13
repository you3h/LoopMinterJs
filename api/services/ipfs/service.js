const fs = require('fs')
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

  async generateImageSettings (body) {
    const {
      collection_name,
      description,
      artist_name,
      thumbnails,
      animation,
      royalty_percentage,
      numOfTraits,
      background,
      backgrounds,
      background_name,
      background_size_width,
      background_size_height,
      royalty_address,
      seed,
      thumbnail_size_width,
      thumbnail_size_height,
      traits
    } = body

    const image_layers = []
    const rgba = {}
    const weights = []

    if (background) {
      backgrounds.forEach(background => {
        rgba[background.name] = Object.keys(background.color).map(obj => background.color[obj])
        weights.push(parseInt(background.rarity))
      })

      image_layers.push({
        layer_name: background_name,
        variations: backgrounds.length,
        size: [
          parseInt(background_size_width),
          parseInt(background_size_height)
        ],
        rgba,
        weights
      })
    }

    if (traits) {
      Object.keys(traits).forEach(trait => {
        const traitName = traits[trait]
        const traitVariants = `${trait}-variants`

        const filenames = {}
        const weights = []

        body[traitVariants].forEach(tr => {
          filenames[tr.name] = tr.filename
          weights.push(parseInt(tr.rarity))
        })

        image_layers.push({
          layer_name: traitName,
          variations: body[trait+'-variants'].length,
          filenames,
          weights
        })
      })
    }

    const parsedBody = {
      collection_name,
      collection_lower: collection_name.toLowerCase(),
      description,
      artist_name,
      thumbnails,
      animation,
      royalty_percentage,
      trait_count: numOfTraits,
      background_color: background,
      royalty_address,
      seed,
      image_layers,
      thumbnail_size: 
        thumbnails && thumbnail_size_width
          ? [
            parseInt(thumbnail_size_width),
            parseInt(thumbnail_size_height)
          ]
          : undefined
    }

    fs.writeFile('../common/metadata.json', JSON.stringify(parsedBody), 'utf8', (err) => {
      if (err) {
          logger.error('An error occured while writing JSON Object to File.');
          throw new BadRequestError()
      }
    });
    return 'Successfully created a json config'
  }

}

module.exports = IPFSService