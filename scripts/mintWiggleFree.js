const hre = require("hardhat");
const { ethers } = require("ethers");

require("dotenv").config();

const wiggleFreeAddress = "0x56a7753bd4b1DD1715Ef428AaDD8d4494ad0b0a8";
const to = "0x7EE6fAD9Ee306551590E81799C49e576f6e57c8D";

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

async function mintmain() {
  const wiggleFreeContract = await hre.ethers.getContractAt(
    "WiggleFree",
    wiggleFreeAddress,
    signer
  );

  const mintTxn = await wiggleFreeContract.safeMint(to);
  const userList = await wiggleFreeContract.getUserList();
  console.log(`Mint successful: ${mintTxn.hash}`);
  console.log(userList);
}

mintmain()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
