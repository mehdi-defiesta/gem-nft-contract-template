
const { ethers } = require("hardhat");
require('dotenv').config();

// npx hardhat run scripts/utils/L2Treasury/3.mintSpecialGems.js --network L2

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Minting GEMs with the account:", deployer.address);
  const treasuryAddress = process.env.TREASURY_PROXY;

  // Get contract instance
  const Treasury = await ethers.getContractAt("Treasury", treasuryAddress);

  // Prepare input parameters for the createPreminedGEMPool function
  // total of 60 gems (15 gems for each rarity starting from rare to legendary)
  const rarities = [
    1, 
    1, 
    1, 
    1, 
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4
  ]; 

  const colors = [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
    [0, 7],
    [1, 0],
    [1, 1],
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
    [1, 6],
    [1, 7],
    [2, 0],
    [2, 1],
    [2, 2],
    [2, 3],
    [2, 4],
    [2, 5],
    [2, 6],
    [2, 7],
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 3],
    [3, 4],
    [3, 5],
    [3, 6],
    [3, 7],
    [4, 0],
    [4, 1],
    [4, 2],
    [4, 3],
    [4, 4],
    [4, 5],
    [4, 6],
    [4, 7],
    [5, 0],
    [5, 1],
    [5, 2],
    [5, 3],
    [5, 4],
    [5, 5],
    [5, 6],
    [5, 7],
    [6, 0],
    [6, 1],
    [6, 2],
    [6, 3],
    [6, 4],
    [6, 5],
    [6, 6],
    [6, 7],
    [7, 0],
    [7, 1],
    [7, 2],
    [7, 3]
  ];

  const quadrants = [
    [2, 2, 2, 2], 
    [2, 2, 2, 3], 
    [2, 2, 3, 2], 
    [2, 2, 3, 3], 
    [2, 3, 2, 2],
    [2, 3, 2, 3],
    [2, 3, 3, 2],
    [2, 3, 3, 3],
    [3, 2, 2, 2], 
    [3, 2, 2, 3], 
    [3, 2, 3, 2], 
    [3, 2, 3, 3], 
    [3, 3, 2, 2],
    [3, 3, 2, 3],
    [3, 3, 3, 2],
    [3, 3, 3, 3], 
    [3, 3, 3, 4], 
    [3, 3, 4, 3], 
    [3, 3, 4, 4], 
    [3, 4, 3, 3],
    [3, 4, 3, 4],
    [3, 4, 4, 3],
    [3, 4, 4, 4],
    [4, 3, 3, 3], 
    [4, 3, 3, 4], 
    [4, 3, 4, 3], 
    [4, 3, 4, 4], 
    [4, 4, 3, 3],
    [4, 4, 3, 4],
    [4, 4, 4, 3],
    [4, 4, 4, 4], 
    [4, 4, 4, 5], 
    [4, 4, 5, 4], 
    [4, 4, 5, 5], 
    [4, 5, 4, 4],
    [4, 5, 4, 5],
    [4, 5, 5, 4],
    [4, 5, 5, 5],
    [5, 4, 4, 4], 
    [5, 4, 4, 5], 
    [5, 4, 5, 4], 
    [5, 4, 5, 5], 
    [5, 5, 4, 4],
    [5, 5, 4, 5],
    [5, 5, 5, 4],
    [5, 5, 5, 5], 
    [5, 5, 5, 6], 
    [5, 5, 6, 5], 
    [5, 5, 6, 6], 
    [5, 6, 5, 5],
    [5, 6, 5, 6],
    [5, 6, 6, 5],
    [5, 6, 6, 6],
    [6, 5, 5, 5], 
    [6, 5, 5, 6], 
    [6, 5, 6, 5], 
    [6, 5, 6, 6], 
    [6, 6, 5, 5],
    [6, 6, 5, 6],
    [6, 6, 6, 5],
  ];

  const tokenURIs = [
    "", 
    "", 
    "", 
    "", 
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ];

  try {
    console.log("Creating premined GEM pool...");

    // Call createPreminedGEMPool
    const tx = await Treasury.createPreminedGEMPool(rarities, colors, quadrants, tokenURIs, {
      gasLimit: 15000000 
    });
    console.log("Transaction sent:", tx.hash);

    // Wait for the transaction to be confirmed
    const receipt = await tx.wait();
    console.log("Transaction successful, receipt:", receipt);
  } catch (error) {
    console.error("Error creating GEM pool:", error);
    if (error.data) {
      console.error("Revert reason:", ethers.utils.toUtf8String(error.data));
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });