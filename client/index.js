const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  if (!process.env.GIFT_FOR) {
      throw new Error('GIFT_FOR env variable is empty');
  }

  const index = niceList.findIndex((item) => item === process.env.GIFT_FOR);

  const merkleTree = new MerkleTree(niceList);
  const proof = merkleTree.getProof(index);
  const root = merkleTree.getRoot();

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
      proof,
      root,
      leaf: process.env.GIFT_FOR,
  });

  console.log({ gift });
}

main();
