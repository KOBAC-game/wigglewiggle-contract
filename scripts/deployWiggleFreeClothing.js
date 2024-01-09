const hre = require("hardhat");
const { ethers } = require("ethers");

require("dotenv").config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

async function deploymain() {
  const wiggleFreeClothingContract = await hre.ethers.deployContract(
    "WiggleFreeClothing",
    signer
  );
  await wiggleFreeClothingContract.waitForDeployment();
  const wiggleClothingAddress = wiggleFreeClothingContract.target;
  console.log(`Wiggle Free Clothing deployed to ${wiggleClothingAddress}`);
}

deploymain()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// version 1(230109 0653) -- polygon mumbai
// 0x188c766AA56BD159507ceFfc2344A9520569A1aF
