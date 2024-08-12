// interact.js
const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

// For Hardhat 
const contract = require("../artifacts/contracts/DVS_v1.sol/Election.json");

// For printing ABI
//console.log(JSON.stringify(contract.abi));

// ethers.js
const ethers = require('ethers');

// Provider
const alchemyProvider = new ethers.providers.JsonRpcProvider(API_URL);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// Contract
const ElectionContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function main() {
    const host = await ElectionContract.getHost();
    //const user = await ElectionContract.logUser();
    //const user_ = await ElectionContract.getUsers();
    console.log("The host address is: " + host);
    //console.log("Users are: " + user_)
  }
  main();