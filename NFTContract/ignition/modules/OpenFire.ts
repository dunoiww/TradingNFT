import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const NFTModule = buildModule("NFTModule", (m) => {
  const fire = m.contract("OpenFire");

  return { fire };
});

module.exports = NFTModule;