const {
  get_EddsaSig_NFT_Mint
} = require('@loopring-web/loopring-sdk')

const {
  LOOPRING_API_KEY,
  EXCHANGE,
  LOOPRING_USER_ACCOUNT_ID,
  LOOPRING_USER_ADDRESS,
  LOOPRING_PRIVATE_KEY,
  NFT_QTY_AMOUNT,
  CREATOR_FEE_BIPS,
  VALID_UNTIL,
  NFT_TYPE,
  NFT_FACTORY,
  IPFS_CID,
  MAX_FEE_TOKEN_ID
} = require('./constants')

const NFTService = require('./NFTService')
const { ipfsCid0ToNftID } = require('./utils')

const nftService = new NFTService()

const getMintConfig = ({ tokenAddress, storageId, mintingFees, nftId }) => {
  return {
    exchange: EXCHANGE,
    minterId: LOOPRING_USER_ACCOUNT_ID,
    toAccountId: LOOPRING_USER_ACCOUNT_ID,
    toAddress: LOOPRING_USER_ADDRESS,
    nftType: NFT_TYPE,
    counterFactualNftInfo: {
      nftFactory: NFT_FACTORY,
      nftOwner: LOOPRING_USER_ADDRESS,
      nftBaseUri: ''
    },
    minterAddress: LOOPRING_USER_ADDRESS,
    tokenAddress,
    storageId,
    nftId,
    maxFee: {
      tokenId: MAX_FEE_TOKEN_ID,
      amount: mintingFees[MAX_FEE_TOKEN_ID].fee
    },
    royaltyPercentage: 5,
    amount: NFT_QTY_AMOUNT,
    creatorFeeBips: CREATOR_FEE_BIPS,
    validUntil: VALID_UNTIL,
    forceToMint: false
  }
}

const main = async () => {
  try {
    const { tokenAddress } = await nftService.getTokenAddress(LOOPRING_API_KEY, {
      nftOwner: LOOPRING_USER_ADDRESS,
      nftFactory: NFT_FACTORY
    })
    if (!tokenAddress) {
      throw new Error('Invalid token address')
    }

    const { offchainId } = await nftService.getNextStorageId(LOOPRING_API_KEY, {
      accountId: LOOPRING_USER_ACCOUNT_ID,
      maxFeeTokenId: MAX_FEE_TOKEN_ID
    })

    const { fees } = await nftService.getOffChainFee(LOOPRING_API_KEY, {
      accountId: LOOPRING_USER_ACCOUNT_ID,
      tokenAddress: tokenAddress
    })

    const nftId = ipfsCid0ToNftID(IPFS_CID)

    const mintConfig = getMintConfig({
      tokenAddress,
      nftId,
      storageId: offchainId,
      mintingFees: fees
    }) 
    console.log(mintConfig)

    const edssasig = get_EddsaSig_NFT_Mint(mintConfig, LOOPRING_PRIVATE_KEY)
    console.log(edssasig)

    const mintNft = await nftService.mintNFT(LOOPRING_API_KEY,
      {
        ...mintConfig,
        eddsaSignature: edssasig
      }
    )
    if (mintNFT) {
      console.log(mintNft)
      console.log('Mint NFT is succeeded')
    }
  } catch (err) {
    console.log(err)
  }
}

main()
