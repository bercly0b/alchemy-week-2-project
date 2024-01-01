const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = 'a2b2274dedc676f45e79d94662a7f836dbe9a0d75fe399be785252c435ef9acd';

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const { proof, root, leaf } = req.body;

  const isInTheList = verifyProof(proof, leaf, root);

  if(isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
