const hre = require("hardhat");

async function main() {

  const Contract = await hre.ethers.getContractFactory("IPRRegistry");

  console.log("Deploying contract...");

  const contract = await Contract.deploy();
  await contract.waitForDeployment();

  const address = await contract.getAddress();

  console.log("=================================");
  console.log("IPRRegistry deployed to:", address);
  console.log("=================================");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
