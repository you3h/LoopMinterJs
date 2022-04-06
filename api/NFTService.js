const axios = require('axios')
const { BASE_URL } = require('./constants')

const getHeaders = (apiKey, others = {}) => ({
  headers: { 'X-API-KEY': apiKey, ...others }
})

const addParams = (params) => ({
  params: { ...params }
})

class NFTService {
  constructor () {
    this.lrcClient = axios.create({ baseURL: `${BASE_URL}/api/v3` })
  }

  // Used for testing only
  async getRelayersCurrentTIme () {
    const res = await this.lrcClient.get(
      '/timestamp'
    )
    return res.data
  }

  async getTokenAddress (apiKey, { nftOwner, nftFactory, nftBaseUri = '' }) {
    const res = await this.lrcClient.get(
      '/nft/info/computeTokenAddress',
      {
        ...getHeaders(apiKey),
        ...addParams({
          nftOwner,
          nftFactory,
          nftBaseUri
        })
      }
    )
    return res.data
  }

  async getNextStorageId (apiKey, { accountId, maxFeeTokenId }) {
    const res = await this.lrcClient.get(
      '/storageId',
      {
        ...getHeaders(apiKey),
        ...addParams({
          accountId,
          sellTokenId: maxFeeTokenId
        })
      }
    )
    return res.data
  }

  async getOffChainFee (apiKey, { accountId, tokenAddress, requestType = 9 }) {
    const res = await this.lrcClient.get(
      '/user/nft/offchainFee',
      {
        ...getHeaders(apiKey),
        ...addParams({
          accountId,
          requestType,
          tokenAddress
        })
      }
    )
    return res.data
  }

  async mintNFT (apiKey, body) {
    const res = await this.lrcClient.post(
      '/nft/mint',
      body, // request body,
      getHeaders(apiKey, {
        'Content-Type': 'application/json'
      })
    )
    return res.data
  }
}

module.exports = NFTService
