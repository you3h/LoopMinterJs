import axios from 'axios'

// const IPFS_SERVER_URL = 'http://localhost:8001/ipfs'
const IPFS_SERVER_URL = 'http://localhost:8080/api/ipfs'

class APIManager {
  constructor () {
    this.ipfsClient = axios.create({ baseURL: IPFS_SERVER_URL })
  }

  async generateImageMetadata (data) {
    const res = await this.ipfsClient.post('/image/generate', data)
    return res.data
  }
}

export default APIManager
