const BN = require('bn.js')

const ipfsCid0ToNftID = (cidV0Str) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const CID = require('cids');
  const cid = new CID(cidV0Str);
  const hashHex = Buffer.from(cid.multihash.slice(2)).toString('hex');
  const hashBN = new BN(hashHex, 16);
  return '0x' + hashBN.toString('hex');
}

module.exports = {
  ipfsCid0ToNftID
}