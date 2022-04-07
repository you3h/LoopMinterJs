const axios = require('axios')
const { IPFS_BASE_URL } = require('../../types/constants')

const getHeaders = (apiKey, secretKey, others = {}) => ({
  headers: { 
    'pinata_api_key': apiKey, 
    'pinata_secret_api_key': secretKey,
    ...others 
  }
})

const addQueryParams = (params) => ({
  params: { ...params }
})

class IPFSClient {
  constructor () {
    this.apiClient = axios.create({ baseURL: IPFS_BASE_URL })
  }

  async getPinList (apiKey, secretKey, options) {
    const res = await this.apiClient.get('/data/pinList', {
        ...getHeaders(apiKey, secretKey)
      }
    )
    return res.data
  }
}

module.exports = IPFSClient
