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

// version 3(230109 0542) -- polygon mumbai
// 0xFC271d35d99Be8C8238D1233ff4e442c4143943b
// withdraw 함수 추가

// version 4(230109 0602) -- polygon mumbai
// 0x8Aa6782f9Fb5819E3BF2735Ff606D3e2a690dfB3
// receivable 함수 추가
