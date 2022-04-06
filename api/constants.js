require('dotenv').config()

const {
  ENV_BASE_URL = 'https://uat2.loopring.io',
  ENV_LOOPRING_API_KEY,
  ENV_LOOPRING_PRIVATE_KEY,
  ENV_LOOPRING_USER_ACCOUNT_ID,
  ENV_LOOPRING_USER_ADDRESS,
  ENV_IPFS_CID,
  ENV_NFT_FACTORY = '0xc852aC7aAe4b0f0a0Deb9e8A391ebA2047d80026', // NFT factory of loopring,
  ENV_EXCHANGE = '0x0BABA1Ad5bE3a5C0a66E7ac838a129Bf948f1eA4' // Loopring exchange address
  // ENV_EXCHANGE = '0x2e76EBd1c7c0C8e7c2B875b6d505a260C525d25e' // Goerli
} = process.env

/**
 * There are 2 base URL
 * https://api3.loopring.io - PRODUCTION
 * https://uat2.loopring.io - TESTNET
 */
const BASE_URL = ENV_BASE_URL

// Both API key and Private key can be exported this from your account using loopring.io
// Set an environmental variable or input it directly as a string.
const LOOPRING_API_KEY = ENV_LOOPRING_API_KEY
const LOOPRING_PRIVATE_KEY = ENV_LOOPRING_PRIVATE_KEY

// L2 Wallet account ID
const LOOPRING_USER_ACCOUNT_ID = ENV_LOOPRING_USER_ACCOUNT_ID

// L2 wallet address
const LOOPRING_USER_ADDRESS = ENV_LOOPRING_USER_ADDRESS

// The IPFS CID of Metadata NFT
const IPFS_CID = ENV_IPFS_CID

// Default Configurations
/**
 * Enum
 * 0 - ERC1155
 * 1 - ERC721
 * By default the NFT_TYPE is 0
 */
const NFT_TYPE = 0

// Fee to the NFT Creator
// TODO: Define what is this for
const CREATOR_FEE_BIPS = 0

// The amount or number of NFT to mint
const NFT_QTY_AMOUNT = 1

// TODO: Define valid until use case
const VALID_UNTIL = 1700000000

// TODO: Define
const MAX_FEE_TOKEN_ID = 1

const NFT_FACTORY = ENV_NFT_FACTORY
const EXCHANGE = ENV_EXCHANGE

module.exports = {
  BASE_URL,
  LOOPRING_API_KEY,
  LOOPRING_PRIVATE_KEY,
  LOOPRING_USER_ACCOUNT_ID,
  LOOPRING_USER_ADDRESS,
  IPFS_CID,
  NFT_TYPE,
  CREATOR_FEE_BIPS,
  NFT_QTY_AMOUNT,
  VALID_UNTIL,
  MAX_FEE_TOKEN_ID,
  NFT_FACTORY,
  EXCHANGE
}
