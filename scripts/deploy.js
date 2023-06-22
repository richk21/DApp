const hre = require("hardhat");

async function main() {
  const Chai = await hre.ethers.getContractFactory("chai");
  const chai = await Chai.deploy();

  //await chai.deployed();

  console.log("Deployed contract!", chai.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  //0xEf98014B63Fe263e759733A8CD70eA0a168a0b7F

  //new - 0x6655f61435aB490aeA653fD30c1C992c9cb9d74e
