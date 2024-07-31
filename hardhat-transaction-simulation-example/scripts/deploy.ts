const { ethers } = require("ethers");
const Tenderly = require("@tenderly/tenderly-sdk");

const PRIVATE_KEY = 'PRIVATE_KEY';
const RPC_URL = 'RPC_URL';
const TENDERLY_ACCESS_KEY = 'TENDERLY_ACCESS_KEY';

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const Tender = require("./Tender.json");
  const factory = new ethers.ContractFactory(Tender.abi, Tender.bytecode, wallet);
  const tender = await factory.deploy(300);

  await tender.deployed();
  console.log("Tender contract deployed at:", tender.address);
  await tender.bid({ value: ethers.utils.parseEther("1.0") });
  await tender.bid({ value: ethers.utils.parseEther("2.0") });
  await provider.send("evm_increaseTime", [301]);
  await tender.endTender();
  await tender.withdraw();
  const tenderly = new Tenderly(TENDERLY_ACCESS_KEY);
  const simulation = await tenderly.simulations.create({
    network_id: "1",
    from: wallet.address,
    to: tender.address,
    input: tender.interface.encodeFunctionData("withdraw"),
    gas_price: "0x0",
    gas_limit: "0x7a120",
    value: "0x0"
  });

  console.log("Simulation URL:", simulation.simulation.id);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
