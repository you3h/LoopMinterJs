import axios from 'axios'

// const NFT_SERVER_URL = 'http://localhost:8001/nft'
const NFT_SERVER_URL = 'http://localhost:8080/api/nft'

// const IPFS_SERVER_URL = 'http://localhost:8001/ipfs'
const IPFS_SERVER_URL = 'http://localhost:8080/api/ipfs'

class APIManager {
  constructor () {
    this.nftClient = axios.create({ baseURL: NFT_SERVER_URL })
    this.ipfsClient = axios.create({ baseURL: IPFS_SERVER_URL })
  }

  async getUser () {
    const res = await this.nftClient.get('/user')
    return res.data
  }

  async setUser (data) {
    const res = await this.nftClient.post('/user/setup', data)
    return res.data
  }

  async mintNFT (data) {
    const res = await this.nftClient.post('/mint', data)
    return res.data
  }

  async generateImageMetadata (data) {
    const res = await this.ipfsClient.post('/image/generate', data)
    return res.data
  }
}

export default APIManager
