const hre = require("hardhat");
const { ethers } = require("ethers");

require("dotenv").config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

async function deploymain() {
  const wiggleFreeContract = await hre.ethers.deployContract(
    "WiggleFree",
    signer
  );
  await wiggleFreeContract.waitForDeployment();
  const wiggleFreeAddress = wiggleFreeContract.target;
  console.log(`Wiggle Free deployed to ${wiggleFreeAddress}`);
}

deploymain()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// version 1(231227 0308)
// 0x56a7753bd4b1DD1715Ef428AaDD8d4494ad0b0a8

// version 2(231227 0326)
// 0x737C374a0c2cb6CeFa7D9f33b768Af4b9985e57e
