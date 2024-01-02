const hre = require("hardhat");
const { ethers } = require("ethers");

require("dotenv").config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

async function deploymain() {
  const wiggleFreeContract = await hre.ethers.deployContract(
    "WiggleFree",
    ["ipfs://QmQufv82DPxMzKKGbKACUuTbnAoNqC9jUDAVLn7avxXq8C"],
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

// version 1(231227 0308) -- sepolia
// 0x56a7753bd4b1DD1715Ef428AaDD8d4494ad0b0a8

// version 2(231227 0326) -- sepolia
// 0x737C374a0c2cb6CeFa7D9f33b768Af4b9985e57e

// version 3(231229 1704) -- polygon mumbai
// 0x56a7753bd4b1DD1715Ef428AaDD8d4494ad0b0a8

// version 4(231230 1431) -- polygon mumbai
// 0x3d9E329f07eA03e792aA07B0025da568D4e608C4

// version 5(231230 1601) -- polygon mumbai
// 0xc004AD6f5b0c4C1052EE79d6C9662A069AAB4166
// 여기까지 감자그림

// version 6(231230 1601) -- polygon mumbai
// 0x0c09dFbe15ab37067dA726978F7d51C815d54d31
// 고양이 그림 uri

// version 7(231231 0056) -- polygon mumbai
// 0xb275ba3BC567A8fbC4F812Fd39098A58952Fb887

// version 8(240102 1106) -- polygon mumbai
// 0x21A95654B869Ba834C9D2D2f52deEF988Ed184C6

// version 9(240102 1136) -- polygon mumbai
// 0xEa9aBac67E52208e227A07EC3e773D04F79a70EB

// version 10(240102 1222) -- polygon mumbai
// 0x292877123Eb02aaEA4acab93076D0Cf927EEc45C
