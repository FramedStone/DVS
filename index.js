import axios from "axios";

const url = `https://eth-mainnet.g.alchemy.com/v2/3Tc2U0tIK48jk5N7qMSnDTw2VVNPqIa3`;

const payload = {
  jsonrpc: '2.0',
  id: 1,
  method: 'eth_blockNumber',
  params: []
};

axios.post(url, payload)
  .then(response => {
    console.log('The latest block number is', parseInt(response.data.result, 16));
  })
  .catch(error => {
    console.error(error);
  });