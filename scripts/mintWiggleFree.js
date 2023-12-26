const hre = require("hardhat");
const { ethers } = require("ethers");

require("dotenv").config();

const wiggleFreeAddress = "0x737C374a0c2cb6CeFa7D9f33b768Af4b9985e57e";
const to = "0x3F233a18310c563270C3f8C6E9759b5f32FF4E08";

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
