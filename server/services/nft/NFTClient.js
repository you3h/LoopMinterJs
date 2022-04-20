const axios = require('axios')
const { NFT_BASE_URL } = require('../../types/constants')

const getHeaders = (apiKey, others = {}) => ({
  headers: { 'X-API-KEY': apiKey, ...others }
})

const addParams = (params) => ({
  params: { ...params }
})

class NFTClient {
  constructor () {
    this.apiClient = axios.create({ baseURL: NFT_BASE_URL })
  }

  // Used for testing only
  async getRelayersCurrentTIme () {
    const res = await this.apiClient.get('/timestamp')
    return res.data
  }

  async getTokenAddress (apiKey, { nftOwner, nftFactory, nftBaseUri = '' }) {
    const res = await this.apiClient.get('/nft/info/computeTokenAddress', {
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
    const res = await this.apiClient.get('/storageId', {
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
    const res = await this.apiClient.get('/user/nft/offchainFee', {
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
    const res = await this.apiClient.post('/nft/mint', 
      body,
      getHeaders(apiKey, {
        'Content-Type': 'application/json'
      })
    )
    return res.data
  }
}

module.exports = NFTClient
