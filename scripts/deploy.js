// scripts/deploy.js

async function main() {
  // Get the contract factory
  const IoTMarket = await ethers.getContractFactory("IoTMarket");

  // Deploy the contract
  const iotMarket = await IoTMarket.deploy();

  // Wait for the deployment to be mined
  await iotMarket.deployed();

  console.log("IoTMarket deployed to:", iotMarket.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
