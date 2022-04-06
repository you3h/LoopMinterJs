const { get_EddsaSig_NFT_Mint } = require('@loopring-web/loopring-sdk')

const { logger } = require('../../utils');
const { name, version } = require('../../package.json');
const { BadRequestError } = require('../../types/errors')

const NFTClient = require('./NFTClient')

const {
  NFT_FACTORY
} = require('../../types/constants')

const {
  ipfsCid0ToNftID
} = require('../../utils')

const SERVICE_NAME = '[NFT_SERVICE]';

class NFTService {
  constructor () {

    this.nftClient = new NFTClient()

    this.minterId = null;
    this.minterAddress = null;
    this.toAccountId = null;
    this.toAddress = null;
    this.apiKey = null;
    this.privateKey = null
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
    };
  }

  async userSetup (body) {
    const {
      minterId,
      minterAddress,
      toAccountId,
      toAddress,
      apiKey,
      privateKey
    } = body

    if (!body || !minterId || !minterAddress) {
      logger.error(`${SERVICE_NAME}: Invalid data entry`)
      throw new BadRequestError();
    }

    this.minterId = minterId;
    this.minterAddress = minterAddress;
    this.toAccountId = toAccountId || minterId;
    this.toAddress = toAddress || minterAddress;
    this.apiKey = apiKey;
    this.privateKey = privateKey

    logger.info(`${SERVICE_NAME}: User setup successful ${JSON.stringify({
      minterId: this.minterId,
      minterAddress: this.minterAddress,
      toAccountId: this.toAccountId,
      toAddress: this.toAddress,
      apiKey: this.apiKey ? 'Yes' : 'None',
      privateKey: this.privateKey ? 'Yes' : 'None'
    })}`)

    return `User setup successful ${JSON.stringify({
      minterId: this.minterId,
      minterAddress: this.minterAddress,
      toAccountId: this.toAccountId,
      toAddress: this.toAddress,
      apiKey: this.apiKey ? 'Yes' : 'None',
      privateKey: this.privateKey ? 'Yes' : 'None'
    })}`
  }

  async getUser () {
    return `Current user ${JSON.stringify({
      minterId: this.minterId,
      minterAddress: this.minterAddress,
      toAccountId: this.toAccountId,
      toAddress: this.toAddress,
      apiKey: this.apiKey ? 'Yes' : 'None',
      privateKey: this.privateKey ? 'Yes' : 'None'
    })}`
  }
  
  async mintNFT (body) {
    const {
      nftClient,
      privateKey,
      apiKey,
      minterId,
      minterAddress,
      toAccountId,
      toAddress
    } = this

    const {
      maxFeeTokenId = 1, // TODO: Remove the default later
      ipfsCid,
      nftType,
      nftAmount,
      royaltyPercentage,
      creatorFeeBips,
      validUntil,
      nftBaseUri = '',
      forceToMint = false
    } = body

    const getMintConfig = ({ tokenAddress, storageId, nftId, mintingFees }) => {
      return {
        minterId,
        toAccountId,
        toAddress,
        nftType,
        counterFactualNftInfo: {
          nftFactory: NFT_FACTORY,
          nftOwner: minterAddress,
          nftBaseUri
        },
        minterAddress,
        tokenAddress,
        storageId,
        nftId,
        maxFee: {
          tokenId: maxFeeTokenId,
          amount: mintingFees[maxFeeTokenId].fee
        },
        royaltyPercentage,
        amount: nftAmount,
        creatorFeeBips,
        validUntil,
        forceToMint
      }
    }

    const getTokenAddress = async () => {
      const res = await nftClient.getTokenAddress(apiKey, {
        nftOwner: minterAddress,
        nftFactory: NFT_FACTORY
      })
      if (!res) { throw new BadRequestError() }
      return res.tokenAddress
    }
    logger.info(`${SERVICE_NAME}: Getting token address`)
    const tokenAddress = await getTokenAddress()

    const getNextStorageId = async () => {
      const res = await nftClient.getNextStorageId(apiKey, {
        accountId: minterId,
        maxFeeTokenId
      })
      if (!res) { throw new BadRequestError() }
      return res.offchainId
    }
    logger.info(`${SERVICE_NAME}: Getting next storage id`)
    const storageId = await getNextStorageId()

    logger.info(`${SERVICE_NAME}: Getting nftId from the ipfsCid`)
    const nftId = ipfsCid0ToNftID(ipfsCid)

    const getOffChainFee = async () => {
      const res = await nftClient.getOffChainFee(apiKey, {
        accountId: minterId,
        tokenAddress: tokenAddress
      })
      if (!res) { throw new BadRequestError() }
      return res.fees
    }
    logger.info(`${SERVICE_NAME}: Getting off chain fees`)
    const mintingFees = await getOffChainFee()

    logger.info(`${SERVICE_NAME}: preparing mint config`)
    const mintConfig = getMintConfig({ tokenAddress, storageId, nftId, mintingFees })
    logger.debug(`${SERVICE_NAME}: ${JSON.stringify(mintConfig)}`)

    const eddsaSignature = get_EddsaSig_NFT_Mint(mintConfig, privateKey)
    logger.info(`${SERVICE_NAME}: EdDSA signature created!`)


    const mintNFT = async () => {
      const res = await nftClient.mintNFT(apiKey, {
        ...mintConfig,
        eddsaSignature: eddsaSignature
      })
      if (!res) { throw new BadRequestError() }
      return res
    }

    const nft = await mintNFT()
    logger.info(`${SERVICE_NAME}: NFT minting has been submitted to be processed!`)

    return nft
  }

  async batchMintNFT () {
    return 'This feature is not yet live (Batch mint NFT)'
  }

  async transferNFT () {
    return 'This feature is not yet live (Transfer NFT)'
  }

  async batchTransferNFT () {
    return 'This feature is not yet live (Batch transfer NFT)'
  }
}

module.exports = NFTService;