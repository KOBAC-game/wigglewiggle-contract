const hre = require("hardhat");
const { ethers } = require("ethers");

require("dotenv").config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

async function deploymain() {
  const wiggleClothingContract = await hre.ethers.deployContract(
    "WiggleClothing",
    signer
  );
  await wiggleClothingContract.waitForDeployment();
  const wiggleClothingAddress = wiggleClothingContract.target;
  console.log(`Wiggle Clothing deployed to ${wiggleClothingAddress}`);
}

deploymain()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// version 1(230106 1428) -- polygon mumbai
// 0x112Cf745866e0b48b946f660b166F8DaC9D68A47

// version 2(230107 1604) -- polygon mumbai
// 0x39F648e6Ae8DC7d4cACfbACeC030305a2225576e
