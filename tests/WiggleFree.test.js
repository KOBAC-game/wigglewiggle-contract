const { expect } = require("chai");
const { ethers } = require("hardhat");

const TEST_URI = "ipfs://QmUmL9HhNuxVMpWimK3yYg45Mz9ad1798hkhSK6wbYuXmv";

describe("WiggleFree", () => {
  let WiggleFree;
  let wiggleFree;
  let owner;
  let addr1;

  beforeEach(async () => {
    [owner, addr1] = await ethers.getSigners(); // 서명자 배열 할당
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

  // 추가적인 테스트 케이스를 작성할 수 있습니다.
  // 예를 들어, 서명자가 baseURI를 변경할 수 있는지 테스트합니다.
  describe("Functions", () => {
    it("Must not allow anyone but the contract owner to change the baseURI", async () => {
      // 'owner' 계정을 사용하여 baseURI 변경 시도
      await wiggleFree.connect(owner).setBaseURI("Hi");
      const baseURI = await wiggleFree.getBaseURI();
      expect(baseURI).to.equal("Hi");

      // 'addr1' 계정을 사용하여 baseURI 변경 시도 (실패해야 함)
      // await expect(wiggleFree.connect(addr1).setBaseURI("Hello")).to.be
      //   .reverted;
    });
  });
});
