async function main() {
    const DVS_v1 = await ethers.getContractFactory("contracts/DVS_v2.sol:Voter");
 
    // Start deployment, returning a promise that resolves to a contract object
    const DVS_v1_ = await DVS_v1.deploy();   
    console.log("Contract deployed to address:", DVS_v1_.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });