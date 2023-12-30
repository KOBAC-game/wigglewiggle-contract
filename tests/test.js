const { expect } = require("chai");
const { ethers } = require("hardhat");

const TEST_URI = "ipfs://QmUmL9HhNuxVMpWimK3yYg45Mz9ad1798hkhSK6wbYuXmv";

describe("WiggleFree", () => {
  let WiggleFree;
  let wiggleFree;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async () => {
    [owner, addr1, addr2] = await ethers.getSigners(); // 서명자 배열 할당
    WiggleFree = await ethers.getContractFactory("WiggleFree");
    wiggleFree = await WiggleFree.deploy(TEST_URI);
    await wiggleFree.waitForDeployment(); // 'deployed()' 메소드로 변경
  });

  describe("Constructor", () => {
    it("Should initialize baseURI properly", async () => {
      const baseURI = await wiggleFree.getBaseURI();
      expect(baseURI).to.equal(TEST_URI);
    });
  });

  // describe("Functions", () => {
  //   it("Must not allow anyone but the contract owner to change the baseURI", async () => {
  //     // 'owner' 계정을 사용하여 baseURI 변경 시도
  //     await wiggleFree.connect(owner).setBaseURI("Hi");
  //     const baseURI = await wiggleFree.getBaseURI();
  //     expect(baseURI).to.equal("Hi");
  //   });
  // });

  describe("Deactivate Functions", () => {
    it("Must not allow safeTransferFrom to work", async () => {
      await wiggleFree.connect(owner).safeMint(addr1.getAddress());
      console.log("HI");
      await wiggleFree
        .connect(addr1)
        .safeTransferFrom(addr1.getAddress(), addr2.getAddress(), 0);
      console.log("Fuck you");
      expect(addr1.address).to.equal(0);
    });
  });
});
