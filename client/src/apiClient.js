import axios from 'axios'

// const NFT_SERVER_URL = 'http://localhost:8000/nft'
const IMAGE_SERVER_URL = 'http://localhost:8000/image'

class APIManager {
  constructor () {
    this.imageClient = axios.create({ baseURL: IMAGE_SERVER_URL })
  }

  async generateImageMetadata (data) {
    const res = await this.imageClient.post('/config/generate', data)
    return res.data
  }
}

export default APIManager
