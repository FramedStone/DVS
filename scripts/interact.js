require('dotenv').config();
const ethers = require('ethers');

const contract_abi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"host_","type":"address"}],"name":"constructor_","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"resetCount","type":"uint256"}],"name":"resetElection_","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"endTime_","type":"uint256"}],"name":"setElection_time_","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"string","name":"name","type":"string"},{"indexed":true,"internalType":"uint256","name":"voteCount","type":"uint256"}],"name":"vote_","type":"event"},{"inputs":[{"internalType":"string","name":"name_","type":"string"},{"internalType":"uint256","name":"id_","type":"uint256"}],"name":"addCandidate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"clearTAC","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getCandidates","outputs":[{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"voteCount","type":"uint256"}],"internalType":"struct Election.Candidate_[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getCandidates_votecount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getElection_status","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getElection_time","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getResetElection_count","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id_","type":"uint256"}],"name":"removeCandidate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"TAC_","type":"uint256"}],"name":"removeTAC","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"resetElection","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"TAC_","type":"uint256[]"}],"name":"setTAC","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"weeks_","type":"uint256"},{"internalType":"uint256","name":"days_","type":"uint256"},{"internalType":"uint256","name":"hours_","type":"uint256"},{"internalType":"uint256","name":"minutes_","type":"uint256"},{"internalType":"uint256","name":"seconds_","type":"uint256"}],"name":"startElection","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"TAC_","type":"uint256"}],"name":"updateTAC","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"verifyTAC","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"index","type":"uint8"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const provider = new ethers.providers.JsonRpcProvider(process.env.API_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);                // required when transaction(s) needed (mostly setters)

// Contract provider
const DVS = new ethers.Contract(process.env.CONTRACT_ADDRESS, contract_abi, provider);

// Contract signer
const DVS_ = new ethers.Contract(process.env.CONTRACT_ADDRESS, contract_abi, signer);

async function main() {
    // try {
    //     await DVS_.addCandidate("test", 0);
    //     console.log("successful");
    // } catch { console.log("unsuccessful"); }
    
    const count = await DVS.getCandidates();
    console.log(count.toString());

    // try {
    //     await DVS_.startElection(0, 0, 0, 60, 0);
    //     console.log("successful");
    // } catch { console.log("unsuccessful"); }

    const time = await DVS.getElection_time();
    console.log(time.toString());

    try {
        await DVS_.resetElection();
        console.log("successful");
    } catch { console.log("unsuccessful"); }
}

main();