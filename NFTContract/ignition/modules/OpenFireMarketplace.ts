import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const NFTMarketplaceModule = buildModule("NFTMarketplaceModule", (m) => {
  const marketplace = m.contract("FireMarketplace", ["0x118c1042bf28Cc7Ec70921f9687A71aB58dCD77b", "0x086f0ff14858901eFe9d5AA6FCa693dC2dE6Ee64"]);

  return { marketplace };
});

module.exports = NFTMarketplaceModule;