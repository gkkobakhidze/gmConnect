
// This is an example test file. Hardhat will run every *.js file in `test/`,
// so feel free to add new ones.

// Hardhat tests are normally written with Mocha and Chai.

// We import Chai to use its asserting functions here.
const { expect } = require("chai");

// We use `loadFixture` to share common setups (or fixtures) between tests.
// Using this simplifies your tests and makes them run faster, by taking
// advantage of Hardhat Network's snapshot functionality.
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

// `describe` is a Mocha function that allows you to organize your tests.
// Having your tests organized makes debugging them easier. All Mocha
// functions are available in the global scope.
//
// `describe` receives the name of a section of your test suite, and a
// callback. The callback must define the tests of that section. This callback
// can't be an async function.
describe("gmTree contract", function () {
  // We define a fixture to reuse the same setup in every test. We use
  // loadFixture to run this setup once, snapshot that state, and reset Hardhat
  // Network to that snapshot in every test.
  async function deploygmTreeFixture() {
    // Get the ContractFactory and Signers here.
    const Token = await ethers.getContractFactory("gmTree");
    const [owner, addr1, addr2, addr3, addr4, addr5] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // its deployed() method, which happens once its transaction has been
    // mined.
    const gmTree = await Token.deploy();

    await gmTree.deployed();

    // Fixtures can return anything you consider useful for your tests
    return { Token, gmTree, owner, addr1, addr2, addr3, addr4, addr5 };
  }

  // You can nest describe calls to create subsections.
  describe("Deployment", function () {
    // `it` is another Mocha function. This is the one you use to define each
    // of your tests. It receives the test name, and a callback function.
    //
    // If the callback function is async, Mocha will `await` it.
    it("Should set the right owner", async function () {
      // We use loadFixture to setup our environment, and then assert that
      // things went well
      const { gmTree, owner } = await loadFixture(deploygmTreeFixture);

      // `expect` receives a value and wraps it in an assertion object. These
      // objects have a lot of utility methods to assert values.

      // This test expects the owner variable stored in the contract to be
      // equal to our Signer's owner.
      expect(await gmTree.owner()).to.equal(owner.address);
    });

  });

  describe("Tree Building", function () {
    it("Should be able to get a tree", async function () {
      const { gmTree, owner, addr1, addr2 } = await loadFixture(
        deploygmTreeFixture
      );
        
        // await gmTree.getTree();
        await gmTree.connect(addr1).getTree();

        expect ( await gmTree.balanceOf(addr1.address)).to.equal(1)
        // expect ( await gmTree.balanceOf(owner.address)).to.equal(1)
    });

    it("Should be able to connect, user1 -> user2", async function () {
      const { gmTree, owner, addr1, addr2, addr3, addr4, addr5 } = await loadFixture(
        deploygmTreeFixture
      );
        await gmTree.getTree();
        await gmTree.connect(addr1).getTree();

        await gmTree.makeConnection(addr1.address);
        expect ( await gmTree.isConnected(owner.address,addr1.address)).to.equal(true)
    });

    it("Should be able to connect, user2 -> user1", async function () {
      const { gmTree, owner, addr1, addr2, addr3, addr4, addr5 } = await loadFixture(
        deploygmTreeFixture
      );
        await gmTree.getTree();
        await gmTree.connect(addr1).getTree();

        await gmTree.makeConnection(addr1.address);
        expect ( await gmTree.isConnected(addr1.address,owner.address)).to.equal(true)
    });

    it("Should be able to connect, increase number of connections for user1", async function () {
      const { gmTree, owner, addr1, addr2, addr3, addr4, addr5 } = await loadFixture(
        deploygmTreeFixture
      );
        await gmTree.getTree();
        await gmTree.connect(addr1).getTree();

        await gmTree.makeConnection(addr1.address);
        expect ( await gmTree.numberOfConnections(owner.address)).to.equal(1)
        
    });

    it("Should be able to connect, increase number of connections for user2", async function () {
      const { gmTree, owner, addr1, addr2, addr3, addr4, addr5 } = await loadFixture(
        deploygmTreeFixture
      );
        await gmTree.getTree();
        await gmTree.connect(addr1).getTree();

        await gmTree.makeConnection(addr1.address);
        expect ( await gmTree.numberOfConnections(addr1.address)).to.equal(1);
    });

    it("User tree should change after connecting", async function () {
      const fs = require('fs');
      const { gmTree, owner, addr1, addr2, addr3, addr4, addr5 } = await loadFixture(
        deploygmTreeFixture
      );
        await gmTree.getTree();
        await gmTree.connect(addr1).getTree();
        await gmTree.connect(addr2).getTree();
        await gmTree.connect(addr3).getTree();
        await gmTree.connect(addr4).getTree();
        await gmTree.connect(addr5).getTree();


        const treeId = await gmTree.getTokenOf(owner.address);
        
        const treeURI_0 = await gmTree.tokenURI(treeId);
        const json_0 = Buffer.from(treeURI_0.substring(29), "base64").toString();
        const result_0 = JSON.parse(json_0);
        fs.writeFile((__dirname+'\\file0.txt'), result_0.image, err => {
          if (err) {
            console.error(err);
          }
        });

        await gmTree.makeConnection(addr1.address);
        const treeURI_1 = await gmTree.tokenURI(treeId);
        const json_1 = Buffer.from(treeURI_1.substring(29), "base64").toString();
        const result_1 = JSON.parse(json_1);
        fs.writeFile((__dirname+'\\file1.txt'), result_1.image, err => {
          if (err) {
            console.error(err);
          }
        });

        await gmTree.makeConnection(addr2.address);
        const treeURI_2 = await gmTree.tokenURI(treeId);
        const json_2 = Buffer.from(treeURI_2.substring(29), "base64").toString();
        const result_2 = JSON.parse(json_2);
        fs.writeFile((__dirname+'\\file2.txt'), result_2.image, err => {
          if (err) {
            console.error(err);
          }
        });

        await gmTree.makeConnection(addr3.address);
        const treeURI_3 = await gmTree.tokenURI(treeId);
        const json_3 = Buffer.from(treeURI_3.substring(29), "base64").toString();
        const result_3 = JSON.parse(json_3);
        fs.writeFile((__dirname+'\\file3.txt'), result_3.image, err => {
          if (err) {
            console.error(err);
          }
        });

        await gmTree.makeConnection(addr4.address);
        const treeURI_4 = await gmTree.tokenURI(treeId);
        const json_4 = Buffer.from(treeURI_4.substring(29), "base64").toString();
        const result_4 = JSON.parse(json_4);
        fs.writeFile((__dirname+'\\file4.txt'), result_4.image, err => {
          if (err) {
            console.error(err);
          }
        });

        await gmTree.makeConnection(addr5.address);
        const treeURI_5 = await gmTree.tokenURI(treeId);
        const json_5 = Buffer.from(treeURI_5.substring(29), "base64").toString();
        const result_5 = JSON.parse(json_5);
        fs.writeFile((__dirname+'\\file5.txt'), result_5.image, err => {
          if (err) {
            console.error(err);
          }
        });
        
        
        expect ( await gmTree.numberOfConnections(owner.address)).to.equal(5);
        
    });
    

    // it("should emit Transfer events", async function () {
    //   const { hardhatToken, owner, addr1, addr2 } = await loadFixture(
    //     deployTokenFixture
    //   );

    //   // Transfer 50 tokens from owner to addr1
    //   await expect(hardhatToken.transfer(addr1.address, 50))
    //     .to.emit(hardhatToken, "Transfer")
    //     .withArgs(owner.address, addr1.address, 50);

    //   // Transfer 50 tokens from addr1 to addr2
    //   // We use .connect(signer) to send a transaction from another account
    //   await expect(hardhatToken.connect(addr1).transfer(addr2.address, 50))
    //     .to.emit(hardhatToken, "Transfer")
    //     .withArgs(addr1.address, addr2.address, 50);
    // });

    // it("Should fail if sender doesn't have enough tokens", async function () {
    //   const { hardhatToken, owner, addr1 } = await loadFixture(
    //     deployTokenFixture
    //   );
    //   const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

    //   // Try to send 1 token from addr1 (0 tokens) to owner.
    //   // `require` will evaluate false and revert the transaction.
    //   await expect(
    //     hardhatToken.connect(addr1).transfer(owner.address, 1)
    //   ).to.be.revertedWith("Not enough tokens");

    //   // Owner balance shouldn't have changed.
    //   expect(await hardhatToken.balanceOf(owner.address)).to.equal(
    //     initialOwnerBalance
    //   );
    // });
  });
});