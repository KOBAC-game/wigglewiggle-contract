const hre = require("hardhat");
const { ethers } = require("ethers");

require("dotenv").config();

const wiggleClothingAddress = "0x8Aa6782f9Fb5819E3BF2735Ff606D3e2a690dfB3";
const to = "0x7EE6fAD9Ee306551590E81799C49e576f6e57c8D";

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

async function withdrawmain() {
  const wiggleClothingContract = await hre.ethers.getContractAt(
    "WiggleClothing",
    wiggleClothingAddress,
    signer
  );

  const amount = ethers.parseEther("0.1");
  console.log(
    "원래 컨트랙트의 잔액은",
    ethers.formatEther(await provider.getBalance(wiggleClothingAddress))
  );
  console.log(
    `Withdrawing ${ethers.formatEther(amount)} Matic from the contract...`
  );

  const withdrawTxn = await wiggleClothingContract.withdraw(amount, to);
  await withdrawTxn.wait();
  console.log(`Withdraw successful: ${withdrawTxn.hash}`);
  console.log(
    "withdraw 이후 컨트랙트의 잔액은",
    ethers.formatEther(await provider.getBalance(wiggleClothingAddress))
  );
}

withdrawmain()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
